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

    <div
      v-if="isMounted"
      ref="wrapperRef"
      :style="style"
      class="roulette__wrapper-list"
    >
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
      size="56"
      :icon="isMutedVolume ? 'volume-slash' : 'volume-high'"
      view="secondary-light"
      class="roulette__volume"
      @click="onToggleVolume"
    />

    <transition name="slide-bottom">
      <ui-button-base
        v-if="!isSpin"
        :text="$t('cases.roulette.button', { n: formattedPrice })"
        :loading="isLoading"
        size="52"
        :is-disabled="!isMounted"
        icon-right="coin-1"
        class="roulette__button"
        @click="startAutoScroll"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Case, CaseItem } from '@/types'
import { useCasesStore, useUserStore } from '@/store'
import { isAudioMuted, playAudio, stopAudio, toggleMuteAudio, } from '@/utils/playAudio'

definePageMeta({ layout: 'without-padding' })

const route = useRoute()
const id = route.params.id as Case['id']
const isAutoScroll = route.query.scroll

const { getCaseItems, getCases, openCase } = useCasesStore()
const { caseItems, cases, receivedItem, musicUrl } =
  storeToRefs(useCasesStore())

const { balance } = storeToRefs(useUserStore())
const { popup, haptic } = useTelegram()
const isMounted = ref(false)
const isActiveItem = ref('')
const isMutedVolume = ref(false)

const currentCase = computed<Case>(
  () => cases.value.find(item => item.id === id)!,
)

const formattedPrice = computed(() =>
  formatePrice(currentCase?.value?.price || 0),
)

const onToggleVolume = () => {
  isMutedVolume.value = !isMutedVolume.value
  toggleMuteAudio()
}

/* ─────────────────────────── исходные данные ──────────────────────────── */
const isSpin = ref(false)
const isLoading = ref(false)

const style = computed(() => {
  if (isSpin.value) {
    return {
      overflow: 'hidden',
      touchAction: 'none',
    }
  }

  return {
    overflow: '',
    touchAction: '',
  }
})

const baseItems = computed<CaseItem[]>(() => {
  const arr = [...caseItems.value]
  // гарантируем, что выпавший предмет присутствует в списке
  if (receivedItem.value && !arr.some(i => i.id === receivedItem.value!.id)) {
    arr.push(receivedItem.value)
  }
  return [...arr].sort(() => Math.random() - 0.5)
})

const copyCount = computed(() => {
  const len = baseItems.value.length
  return len ? Math.max(3, Math.ceil(100 / len)) : 3
})

/* ──────────────────────────── автоскролл ─────────────────────────────── */
let rafId: number | null = null

async function startAutoScroll(peakSpeedPxS = 800) {
  if (currentCase.value?.price > balance.value) {
    haptic.impactOccurred('rigid')
    popup?.showAlert?.('Недостаточно средств')
    return
  }

  if (musicUrl.value) {
    stopAudio()
    playAudio(musicUrl.value)
  }

  isActiveItem.value = ''
  if (isSpin.value) return
  const el = wrapperRef.value
  if (!el) return

  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  isLoading.value = true
  // Получаем результат кейса до начала анимации
  const data = await openCase(id, currentCase.value.category === 'robux')
  isLoading.value = false

  isSpin.value = true
  if (!data) {
    stopAudio()
    popup.showAlert('Кейс пока не доступен, попробуйте позже')
    isSpin.value = false
    return
  }

  await nextTick() // ждём, пока элемент появится в DOM

  // DOM‑элемент выпавшего предмета
  const targetEl = el.querySelector<HTMLElement>(
    `[data-origin-id="${receivedItem.value?.id}"]`,
  )
  if (!targetEl) {
    isSpin.value = false
    return
  }

  // ─── вспомогательные данные для вибрации ──────────────────────────
  const itemHeight = targetEl.clientHeight
  let lastVibrationIndex = -1

  // Центрируем элемент
  const startScroll = el.scrollTop
  let targetScroll =
    targetEl.offsetTop - el.clientHeight / 2 + targetEl.clientHeight / 2

  // Принудительно прокручиваем только вниз
  const oneListHeight = el.scrollHeight / copyCount.value
  while (targetScroll < startScroll) {
    targetScroll += oneListHeight
  }
  let distance = targetScroll - startScroll

  // Мы хотим, чтобы «спин» всегда продолжался одинаковое время и шёл с
  // приблизительно одинаковой средней скоростью. Поэтому задаём фиксированную
  // длительность и, при необходимости, добавляем дополнительные «круги», пока
  // расстояние не станет достаточным.
  const DURATION = 7000 // мс — фиксированная длительность прокрутки
  const MIN_DISTANCE = (peakSpeedPxS * DURATION) / 1000 // px — путь при такой скорости
  while (distance < MIN_DISTANCE) {
    targetScroll += oneListHeight
    distance += oneListHeight
  }
  const startTime = performance.now()
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / DURATION, 1)
    el.scrollTop = startScroll + distance * easeOutCubic(progress)
    handleScroll(el)

    // Вибрация в середине каждого элемента
    const centerPos = el.scrollTop + el.clientHeight / 2
    const currentIndex = Math.floor(centerPos / itemHeight)
    if (currentIndex !== lastVibrationIndex) {
      haptic.impactOccurred('light')
      lastVibrationIndex = currentIndex
    }

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      isActiveItem.value = receivedItem.value!.id
      rafId = null
      navigateTo(`/cases/item/${id}`, { replace: true })
      isSpin.value = false
    }
  }

  rafId = requestAnimationFrame(step)
}

/* ─────────────────────────── бесконечный список ───────────────────────── */
const displayedItems = computed<CaseItem[]>(() => {
  const arr = baseItems.value
  if (!arr.length) return []
  // делаем `copyCount` копий, чтобы итоговая длина была ≥ 100 и сохранялась бесшовность
  return Array.from({ length: copyCount.value }, () => arr).flat()
})

/* ────────────────────────── логика прокрутки ──────────────────────────── */
const wrapperRef = ref<HTMLElement | null>(null)

function handleScroll(el: HTMLElement) {
  const oneListHeight = el.scrollHeight / copyCount.value
  if (el.scrollTop <= 0) {
    // Дошли до самого верха → перескакиваем вниз на 1 длину списка
    el.scrollTop += oneListHeight
  } else if (el.scrollTop >= oneListHeight * 2) {
    // Дошли до самого низа → перескакиваем вверх на 1 длину списка
    el.scrollTop -= oneListHeight
  }
}

onMounted(async () => {
  haptic.impactOccurred('medium')

  isMutedVolume.value = isAudioMuted()
  if (!cases.value.length) await getCases()

  await getCaseItems(id, currentCase.value.category === 'robux')
  isMounted.value = true

  if (isAutoScroll) {
    setTimeout(() => {
      startAutoScroll()
    }, 300)
  }

  await nextTick() // ждём рендер
  const el = wrapperRef.value!
  el.scrollTop = el.scrollHeight / 3
  const onScroll = () => handleScroll(el)
  el.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => el.removeEventListener('scroll', onScroll))
})

useBackButton(() => {
  stopAudio()
  navigateTo('/cases')
})
onBeforeUnmount(() => {
  // caseItems.value = []
})

// Блокируем кнопку «назад», пока идёт спин
onBeforeRouteLeave((to, from, next) => {
  if (isSpin.value) {
    next(false)
  } else {
    next()
  }
})
</script>

<style scoped lang="scss">
.roulette {
  @include scroll-gradient();
  @include scroll-gradient-top();

  height: 100%;

  position: relative;

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

  &__volume {
    position: absolute;
    bottom: 86px;
    right: 0;
    z-index: 100;
  }

  &__button {
    position: absolute;
    bottom: 16px;
    left: 0;
    z-index: 3;
  }
}
</style>
