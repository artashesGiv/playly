<template>
  <div class="step-1">
    <div class="step-1__cases">
      <div class="step-1__scroller">
        <cases-card
          v-for="item in displayedItems"
          :key="item.id"
          is-background
          v-bind="item"
          class="step-1__case"
        />
      </div>
    </div>

    <div class="step-1__content container">
      <div class="step-1__text">
        <main-logo />
        <h2>{{ $t('onboarding-v2.step-1.title') }}</h2>
        <span>{{ $t('onboarding-v2.step-1.description') }}</span>
      </div>
      <ui-button-base
        :text="$t('onboarding-v2.step-1.button')"
        class="step-1__button"
        size="52"
        @click="emit('next-step')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCasesStore } from '@/store'
import type { Case } from '@/types'

const emit = defineEmits(['next-step'])

const { casesOnboarding } = useCasesStore()

const testCases = computed(() =>
  casesOnboarding.filter(item => item.price === 500),
)

const displayedItems = computed<Case[]>(() => {
  const arr = testCases.value
  if (!arr.length) return []
  // делаем `copyCount` копий, чтобы итоговая длина была ≥ 100 и сохранялась бесшовность
  return Array.from({ length: 30 }, () => arr).flat()
})
</script>

<style scoped lang="scss">
.step-1 {
  @include column(56px);

  min-height: 100%;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;

  &__cases {
    @include row(10px);

    overflow: hidden;
    position: relative;
    padding: 0 16px;
  }

  &__scroller {
    @include row(10px);

    margin: 0 -16px;
    animation: scroll-left 40s linear infinite;
  }

  &__case {
    flex: 0 0 200px;
    height: 250px;
  }

  &__content {
    @include column(56px);

    justify-content: space-between;
  }

  &__text {
    @include column(8px);

    align-items: center;
    text-align: center;

    h2 {
      font: var(--font-massive-bold);
      color: var(--white);
    }

    span {
      font: var(--font-large-medium);
      color: var(--light-500);
    }
  }

  &__button {
    //margin-top: auto;
    //margin-bottom: 16px;
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
