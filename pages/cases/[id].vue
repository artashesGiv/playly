<template>
  <div class="roulette">
    <ui-icon-base
      name="roulette-arrow-left"
      class="roulette__icon roulette__icon--left"
      :class="{ 'is-active': receivedItem }"
    />
    <ui-icon-base
      name="roulette-arrow-right"
      class="roulette__icon roulette__icon--right"
      :class="{ 'is-active': receivedItem }"
    />

    <div v-if="isMounted" ref="wrapperRef" class="roulette__wrapper-list">
      <cases-roulette-item-card
        v-for="(item, index) in displayedItems"
        :key="`${item.id}-${index}`"
        class="roulette__item"
        v-bind="item"
        :is-active="isActiveItem === item.id"
        :data-origin-id="item.id"
      />
    </div>

    <ui-button-base
      :text="$t('cases.roulette.button', { n: formattedPrice })"
      :loading="isSpin"
      size="52"
      :is-disabled="currentCase?.price > balance || !isMounted"
      icon-right="coin-1"
      class="roulette__button"
      @click="startAutoScroll"
    />
  </div>
</template>

<script setup lang="ts">
import type { Case, CaseItem } from '@/types'
import { useCasesStore, useUserStore } from '@/store'

definePageMeta({ layout: 'without-padding' })

const route = useRoute()
const id = route.params.id as Case['id']

const { getCaseItems, getCases, openCase } = useCasesStore()
const { caseItems, cases, receivedItem } = storeToRefs(useCasesStore())
const { balance } = storeToRefs(useUserStore())
const isMounted = ref(false)
const isActiveItem = ref('')

const currentCase = computed<Case>(
  () => cases.value.find(item => item.id === id)!,
)

const formattedPrice = computed(() =>
  formatePrice(currentCase?.value?.price || 0),
)

/* ─────────────────────────── исходные данные ──────────────────────────── */
const isSpin = ref(false)

const baseItems = computed<CaseItem[]>(() => {
  const arr = [...caseItems.value]
  // гарантируем, что выпавший предмет присутствует в списке
  if (receivedItem.value && !arr.some(i => i.id === receivedItem.value!.id)) {
    arr.push(receivedItem.value)
  }
  return arr
})

/* ──────────────────────────── автоскролл ─────────────────────────────── */
let rafId: number | null = null

async function startAutoScroll(peakSpeedPxS = 800) {
  isActiveItem.value = ''
  if (isSpin.value) return
  const el = wrapperRef.value
  if (!el) return

  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  isSpin.value = true

  // Получаем результат кейса до начала анимации
  await openCase(id, currentCase.value.category === 'robux')
  await nextTick() // ждём, пока элемент появится в DOM

  // DOM‑элемент выпавшего предмета
  const targetEl = el.querySelector<HTMLElement>(
    `[data-origin-id="${receivedItem.value?.id}"]`,
  )
  if (!targetEl) {
    isSpin.value = false
    return
  }

  // Центрируем элемент
  const startScroll = el.scrollTop
  let targetScroll =
    targetEl.offsetTop - el.clientHeight / 2 + targetEl.clientHeight / 2

  // Принудительно прокручиваем только вниз
  const oneListHeight = el.scrollHeight / 3
  while (targetScroll < startScroll) {
    targetScroll += oneListHeight
  }
  const distance = targetScroll - startScroll

  // Рассчитываем продолжительность анимации
  const MIN_DURATION = 7000 // мс — гарантируем минимум 7 с
  // Оценка времени исходя из расстояния и пиковой скорости
  const estimated = (Math.abs(distance) / peakSpeedPxS) * 800
  const DURATION = Math.max(MIN_DURATION, estimated)
  const startTime = performance.now()
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / DURATION, 1)
    el.scrollTop = startScroll + distance * easeOutCubic(progress)
    handleScroll(el)

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      isActiveItem.value = receivedItem.value!.id
      isSpin.value = false
      rafId = null
      navigateTo(`/cases/item/${id}`)
    }
  }

  rafId = requestAnimationFrame(step)
}

/* ─────────────────────────── бесконечный список ───────────────────────── */
const displayedItems = computed<CaseItem[]>(() => {
  const arr = baseItems.value
  // три копии для бесшовной прокрутки
  return [...arr, ...arr, ...arr]
})

/* ────────────────────────── логика прокрутки ──────────────────────────── */
const wrapperRef = ref<HTMLElement | null>(null)

function handleScroll(el: HTMLElement) {
  const oneListHeight = el.scrollHeight / 3
  if (el.scrollTop <= 0) {
    // Дошли до самого верха → перескакиваем вниз на 1 длину списка
    el.scrollTop += oneListHeight
  } else if (el.scrollTop >= oneListHeight * 2) {
    // Дошли до самого низа → перескакиваем вверх на 1 длину списка
    el.scrollTop -= oneListHeight
  }
}

onMounted(async () => {
  if (!cases.value.length) await getCases()
  await getCaseItems(id, currentCase.value.category === 'robux')
  isMounted.value = true

  await nextTick() // ждём рендер
  const el = wrapperRef.value!
  el.scrollTop = el.scrollHeight / 3
  const onScroll = () => handleScroll(el)
  el.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => el.removeEventListener('scroll', onScroll))
})

useBackButton()
</script>

<style scoped lang="scss">
.roulette {
  height: 100%;
  @include scroll-gradient();
  @include scroll-gradient-top();

  &__wrapper-list {
    @include column(10px);

    height: 100%;
    overflow-y: auto;
  }

  &__icon {
    color: var(--light-800);
    font-size: 26px;
    z-index: 2;
    transition: var(--transition-base);

    &--left {
      @include center('vertical');
      right: -16px;
    }
    &--right {
      @include center('vertical');
      left: -16px;
    }

    &.is-active {
      color: var(--light-400);
    }
  }

  &__button {
    position: absolute;
    bottom: 16px;
    left: 0;
    z-index: 3;
  }
}
</style>
