<template>
  <div class="profile">
    <profile-main />
    <star-pets-link-card />
    <language />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-items-list type="own" />
    <ui-divider />
    <profile-items-list type="received" />
    <ui-divider />
    <agreement />
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'

const { getItems } = useItemsStore()

onMounted(async () => {
  await getItems()
})
</script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
