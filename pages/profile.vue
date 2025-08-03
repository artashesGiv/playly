<template>
  <div v-if="!isLoading" class="profile">
    <profile-main />
    <star-pets-link-card />
    <language />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-items-list type="in_withdraw_progress" />
    <ui-divider />
    <profile-items-list type="own" />
    <ui-divider />
    <profile-items-list type="withdraw_success" />
    <ui-divider />
    <profile-items-list type="sold" />
    <ui-divider />
    <agreement />
  </div>
  <ui-spinner v-else view="primary" size="xl" class="profile__spinner" />
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'

const isLoading = ref(false)

const { getItems } = useItemsStore()

onMounted(async () => {
  try {
    isLoading.value = true
    await getItems()
  } catch {
    // error
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
.profile {
  @include column(18px);

  &__spinner {
    @include center;
  }
}
</style>
