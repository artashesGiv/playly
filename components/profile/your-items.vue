<template>
  <div class="items">
    <ui-title
      :text="$t('profile.items.your')"
      :additional-text="$t('common.items', ownItems.length)"
    />
    <div class="items__list">
      <case-item v-for="item in ownItems" :key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store'

const { ownItems } = storeToRefs(useProfileStore())
</script>

<style scoped lang="scss">
.items {
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
