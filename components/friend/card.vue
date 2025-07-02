<template>
  <ui-card class="friend-card">
    <div class="friend-card__content">
      <div class="friend-card__left">
        <nuxt-img :src="photo_url" class="friend-card__avatar" />
        <div class="friend-card__data">
          <span class="friend-card__name">{{ first_name }}</span>
          <span class="friend-card__balance description">
            {{ $t('common.coins', 0) }}
          </span>
        </div>
      </div>
      <div class="friend-card__bounty">
        <span>+ {{ settings.ref_crystal_amount }}</span>
        <main-mascot size="xs" />
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import { useCoinsStore } from '@/store'
import type { Friend } from '@/types'

defineProps<Friend>()

const { settings } = storeToRefs(useCoinsStore())
</script>

<style scoped lang="scss">
.friend-card {
  &__content {
    @include row(12px);

    justify-content: space-between;
  }

  &__left {
    @include row(10px);
  }

  &__avatar {
    border-radius: 50%;
    width: 44px;
    height: 44px;
  }

  &__data {
    @include column;
  }

  &__name {
    color: var(--white);
    font: var(--font-base-semibold);
  }

  &__bounty {
    @include row(4px);

    border-radius: 18px;
    padding: 10px;
    background-color: var(--light-800);
    color: var(--white);
    font: var(--font-normal-semibold);
  }
}
</style>
