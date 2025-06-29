<template>
  <div class="roulette">
    <ui-icon-base
      name="roulette-arrow-left"
      class="roulette__icon roulette__icon--left"
      :class="{ 'is-active': foundId }"
    />
    <ui-icon-base
      name="roulette-arrow-right"
      class="roulette__icon roulette__icon--right"
      :class="{ 'is-active': foundId }"
    />

    <div ref="wrapperRef" class="roulette__wrapper-list">
      <cases-roulette-item-card
        v-for="(item, index) in displayedItems"
        :key="`${item.id}-${index}`"
        class="roulette__item"
        v-bind="item"
        :is-active="foundId === item.id"
        :data-origin-index="index % caseItems.length"
      />
    </div>

    <ui-button-base
      :text="$t('cases.roulette.button', 500)"
      :loading="isSpin"
      size="52"
      icon-right="coin-1"
      class="roulette__button"
      @click="startAutoScroll('up')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Case, CaseItem } from '@/types'
import { useRouletteSore } from '@/store'

definePageMeta({ layout: 'without-padding' })

/* ─────────────────────────── исходные данные ──────────────────────────── */
const route = useRoute()
const id = route.params.id as Case['id']
const { caseItems } = storeToRefs(useRouletteSore())
const isSpin = ref(false)
const foundId = ref<Maybe<CaseItem['id']>>(null)

function centerNearestItem(el: HTMLElement, durationMs = 500) {
  const containerRect = el.getBoundingClientRect()
  const containerCenterY = containerRect.top + containerRect.height / 2

  let nearest: HTMLElement | null = null
  let delta = 0

  for (const child of Array.from(el.children) as HTMLElement[]) {
    if (!child.classList.contains('roulette__item')) continue
    const rect = child.getBoundingClientRect()
    const itemCenterY = rect.top + rect.height / 2
    const d = itemCenterY - containerCenterY
    if (nearest === null || Math.abs(d) < Math.abs(delta)) {
      nearest = child
      delta = d
    }
  }

  if (!nearest || delta === 0) return

  const startScroll = el.scrollTop
  const startTime = performance.now()

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const smoothStep = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / durationMs, 1) // 0–1
    const eased = easeOutCubic(progress)

    el.scrollTop = startScroll + delta * eased
    handleScroll(el)

    if (progress < 1) {
      requestAnimationFrame(smoothStep)
    } else {
      const index = Number(nearest.dataset.originIndex)
      foundId.value = caseItems.value[index].id

      setTimeout(() => {
        navigateTo(`/cases/item/${index}`)
      }, 500)
    }
  }

  requestAnimationFrame(smoothStep)
}

type Direction = 'down' | 'up'

/* ──────────────────────────── автоскролл ─────────────────────────────── */
let rafId: number | null = null

function startAutoScroll(direction: Direction = 'down', peakSpeedPxS = 800) {
  if (isSpin.value) return
  const el = wrapperRef.value
  if (!el) return

  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  foundId.value = null
  isSpin.value = true

  const DURATION = 7000
  const sign = direction === 'down' ? 1 : -1
  const startTime = performance.now()
  let prevTime = startTime

  const step = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / DURATION, 1) // 0 → 1
    const velocity = peakSpeedPxS * Math.sin(Math.PI * progress) // px / c
    const dt = (now - prevTime) / 400
    prevTime = now

    el.scrollTop += sign * velocity * dt
    handleScroll(el)

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      centerNearestItem(el)
      isSpin.value = false
      rafId = null
    }
  }

  rafId = requestAnimationFrame(step)
}

/* ─────────────────────────── бесконечный список ───────────────────────── */
const displayedItems = computed<CaseItem[]>(() => {
  const arr = caseItems.value
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
  await nextTick() // ждём отрисовки
  const el = wrapperRef.value
  if (!el) return

  // Ставим прокрутку в «центральный» список
  el.scrollTop = el.scrollHeight / 3

  // Вешаем обработчик
  const onScroll = () => handleScroll(el)
  el.addEventListener('scroll', onScroll, { passive: true })

  // Снимаем при демонтировании
  onBeforeUnmount(() => {
    el.removeEventListener('scroll', onScroll)
  })
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
