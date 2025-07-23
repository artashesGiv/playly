<template>
  <div class="agreement">
    <div class="agreement__header">
      <div class="agreement__title title">
        {{ $t(`agreement.${currentTab}.title`) }}
      </div>
      <div class="agreement__description description">
        {{ $t(`agreement.${currentTab}.description`) }}
      </div>
    </div>
    <ui-divider />
    <div class="agreement__content">
      <ui-tabs v-model="currentTab" :list="tabs" />
      <div class="agreement__text">
        {{ $t(`agreement.${currentTab}.text`) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabsProps } from '@/components/ui/tabs.vue'

const { t } = useI18n()

const route = useRoute()
useBackButton()
definePageMeta({
  layout: 'empty',
})

const currentTab = ref<Agreements>('term')

const tabs: TabsProps['list'] = [
  {
    id: 'term',
    text: t('agreement.term.button'),
  },
  {
    id: 'policy',
    text: t('agreement.policy.button'),
  },
  {
    id: 'AML',
    text: t('agreement.AML.button'),
  },
]

onMounted(() => {
  currentTab.value = route.query.tab as Agreements
})
</script>

<style scoped lang="scss">
.agreement {
  @include column(14px);

  padding: 18px 0;

  &__header {
    @include column(2px);

    align-items: center;
  }

  &__content {
    @include column(20px);
  }

  &__text {
    font: var(--font-base-medium);
  }
}
</style>
