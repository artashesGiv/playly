<template>
  <div class="shop-v2-step-2">
    <ui-input-base
      v-model="searchName"
      v-model:is-error="errors[2].input"
      :error-message="$t('market.steps.2.search_error')"
      :placeholder="$t('market.steps.2.search_placeholder')"
      icon="profile-1"
    />
    <span v-if="errors[2].select" class="shop-v2-step-2__error-text">
      {{ $t('market.steps.2.select_error') }}
    </span>
    <div class="shop-v2-step-2__content">
      <transition-fade>
        <template v-if="!loading">
          <span v-if="!marketFlowData.users.length">
            {{ $t('market.steps.2.empty_list_message') }}
          </span>
          <div v-else class="shop-v2-step-2__list-wrapper">
            <div class="shop-v2-step-2__users">
              <robux-buy-item-card
                v-for="user in marketFlowData.users"
                :key="user.roblox_id"
                :text="user.name"
                :src="user.avatar_url"
                :is-error="errors[2].select"
                :is-active="user.roblox_id === marketFlowData.user?.roblox_id"
                @click="onClick(user)"
              />
            </div>
          </div>
        </template>
        <ui-spinner v-else size="xl" class="shop-v2-step-2__spinner" />
      </transition-fade>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore } from '@/store'
import type { RobloxUser } from '@/types'

const { marketFlowData, searchName, errors } = storeToRefs(useShopV2FlowStore())

const loading = useKeyLoading('fetch-roblox-user')

const onClick = (user: RobloxUser) => {
  marketFlowData.value.user = user
  errors.value[2].select = false
}
</script>

<style scoped lang="scss">
.shop-v2-step-2 {
  @include column(12px);
  height: 100%;

  span {
    font: var(--font-base-medium);
  }

  &__list-wrapper {
    @include column;

    height: 100%;
  }

  &__users {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    grid-column: 50;
    max-height: calc(100vh - 363px);
    overflow-y: auto;
  }

  &__content {
    flex: 1 1 0;
  }

  &__error-text {
    color: var(--red-500);
  }

  &__spinner {
    @include center;
  }
}
</style>
