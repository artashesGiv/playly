<template>
  <ui-card class="users">
    <div class="users__content">
      <div class="users__item">
        <div class="users__image-wrapper">
          <nuxt-img :src="user.roblox_avatar" />
        </div>
        <span class="users__name">{{ user.roblox_username }}</span>
      </div>
      <ui-icon-base name="right-square-1" />
      <div class="users__item">
        <div class="users__image-wrapper">
          <nuxt-img
            :src="
              supplier.supplier_roblox_avatar ||
              'https://playly.b-cdn.net/playly_ico.png'
            "
          />
        </div>
        <span class="users__name">{{ supplier.supplier_roblox_username }}</span>
      </div>
    </div>
    <ui-divider view="light" />
    <span class="font-base-medium">
      {{ $t('market.steps.5.steps.2.users.description') }}
    </span>
  </ui-card>
</template>

<script setup lang="ts">
import type { ShopV2Withdraw } from '@/types'

export type ShopV2WithdrawUsers = {
  user: ShopV2Withdraw['roblox_account']
  supplier: NonNullable<ShopV2Withdraw['supplier_info']>
}

defineProps<ShopV2WithdrawUsers>()
</script>

<style scoped lang="scss">
.users {
  @include column(14px);

  &__content {
    @include row(24px);

    margin: 0 auto;

    i {
      font-size: 28px;
    }
  }

  &__item {
    @include column(12px);

    align-items: center;
  }

  &__image-wrapper {
    @include row;

    align-items: center;
    justify-content: center;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background-color: var(--light-900);

    img {
      width: 50px;
      height: 50px;
    }
  }

  &__name {
    @include ellipsis();

    width: 105px;
    text-align: center;
    font: var(--font-base-semibold);
  }
}
</style>
