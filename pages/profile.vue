<template>
  <div v-if="!isLoading" class="profile">
    <profile-main />
    <ui-button-base
      v-if="clientAllowedRoutes.includes('shop')"
      :text="$t('market.orders.buttonText')"
      view="secondary-light"
      size="50"
      icon="Bag-7"
      badge-view="primary"
      @click="navigateTo('/shop-v2/orders')"
    >
      <template v-if="allWithdraws.length" #badge>
        {{ allWithdraws.length }}
      </template>
    </ui-button-base>
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
import { useAuthStore, useItemsStore, useShopV2Store } from '@/store'
import { clientsMap } from '@/assets/content'

const isLoading = ref(false)

const { client } = storeToRefs(useAuthStore())

const clientAllowedRoutes = computed(() => clientsMap[client.value].routes)

const { getItems } = useItemsStore()
const { allWithdraws } = storeToRefs(useShopV2Store())

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
