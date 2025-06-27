<template>
  <div class="items">
    <ui-title
      :text="t('profile.items.received')"
      :additional-text="t('common.items', 2)"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss"></style>
