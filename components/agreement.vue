<template>
  <div class="agreement">
    <ui-button-base
      view="secondary"
      :text="$t('agreement.term.button')"
      size="46"
      class="agreement__button"
      is-ellipsis
      icon="document"
      @click="onClick('term')"
    />
    <ui-button-base
      view="secondary"
      :text="$t('agreement.policy.button')"
      size="46"
      class="agreement__button"
      is-ellipsis
      @click="onClick('policy')"
    />
    <ui-button-base
      view="secondary"
      :text="$t('agreement.AML.button')"
      size="46"
      class="agreement__button"
      is-ellipsis
      @click="onClick('AML')"
    />
    <ui-button-base
      view="secondary"
      :text="$t('contacts.navigate')"
      size="46"
      class="agreement__button"
      is-ellipsis
      @click="navigateTo('/contacts')"
    />
  </div>
</template>

<script setup lang="ts">
const onClick = (tab: Agreements) => {
  navigateTo(`/agreements?tab=${tab}`)
}
</script>

<style scoped lang="scss">
.agreement {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  &__button:first-child,
  &__button:last-child {
    grid-column: span 2;
  }
}
</style>
