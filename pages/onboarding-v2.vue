<template>
  <div class="onboarding">
    <!--    <ui-button-base text="1" @click="activeStep = 1" />-->
    <!--    <ui-button-base text="5" @click="activeStep = 5" />-->
    <transition-fade>
      <component
        :is="componentMap[activeStep]"
        v-if="isMounted"
        :key="activeStep"
        :case-id="selectCase"
        @next-step="onNextStep"
      />
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import type { Case } from '@/types'
import { useCasesStore } from '@/store'

type Step = 1 | 2 | 3 | 5

definePageMeta({
  layout: 'without-all-padding',
})

const route = useRoute()
const router = useRouter()

const activeStep = ref<Step>(1)
const selectCase = ref<Maybe<Case['id']>>(null)
const isMounted = ref(false)

const { fetchCasesOnboarding } = useCasesStore()

const componentMap: Record<Step, Component> = {
  '1': defineAsyncComponent(
    () => import('@/components/onboarding-v2/step/1.vue'),
  ),
  '2': defineAsyncComponent(
    () => import('@/components/onboarding-v2/step/2.vue'),
  ),
  '3': defineAsyncComponent(
    () => import('@/components/onboarding-v2/step/3.vue'),
  ),
  '5': defineAsyncComponent(
    () => import('@/components/onboarding-v2/step/5.vue'),
  ),
}

const onNextStep = (params: Case['id']) => {
  switch (activeStep.value) {
    case 2: {
      selectCase.value = params
      activeStep.value++
      break
    }
    default: {
      activeStep.value++
      break
    }
  }
}

watch(
  route,
  () => {
    const currentStep = route.query.step

    if (currentStep) {
      activeStep.value = +currentStep as Step
    }
  },
  { immediate: true },
)

watch(
  activeStep,
  () => {
    router.replace({ query: { step: activeStep.value } })
  },
  { immediate: true },
)

onMounted(async () => {
  await fetchCasesOnboarding()
  isMounted.value = true
})
</script>

<style scoped lang="scss">
.onboarding {
  height: 100%;
}
</style>
