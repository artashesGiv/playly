<template>
  <cases-roulette
    v-if="caseId"
    :id="caseId"
    :case-items="caseItems"
    :current-case="currentCase"
    :back-button="backButton"
    is-onboarding
    rout-to-back="/onboarding-v2?step=2"
    class="step-3"
  />
</template>

<script setup lang="ts">
import type { Case } from '@/types'
import { useCasesStore } from '@/store'
import type { ButtonProps } from '@/components/ui/button-base/index.vue'

definePageMeta({ layout: 'without-padding' })

type Props = {
  caseId: Maybe<Case['id']>
}

const props = defineProps<Props>()

const { caseItems, cases } = storeToRefs(useCasesStore())
const { t } = useI18n()

const currentCase = computed<Case>(
  () => cases.value.find(item => item.id === props.caseId)!,
)

const backButton: ButtonProps = {
  text: t('onboarding-v2.step-3.back_button'),
  view: 'secondary',
  size: '52',
  onClick: () => navigateTo('/onboarding-v2?step=2'),
}
</script>

<style scoped lang="scss">
.step-3 {
  margin: 0 16px;
}
</style>
