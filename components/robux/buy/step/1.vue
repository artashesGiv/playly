<template>
  <div class="robux-buy-1">
    <ui-input-base
      v-model="searchName"
      icon="profile-1"
      :placeholder="$t('robux.buy.step-1.nicknamePlaceholder')"
    />
    <transition-fade>
      <span v-if="!users.length"> {{ $t('robux.buy.step-1.empty') }} </span>
      <div v-else class="robux-buy-1__list-wrapper">
        <div class="robux-buy-1__users">
          <robux-buy-item-card
            v-for="user in users"
            :key="user.roblox_id"
            :text="user.name"
            :src="user.avatar_url"
            :is-active="user.roblox_id === stepsData.user?.roblox_id"
            @click="stepsData.user = user"
          />
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { users, stepsData, searchName } = storeToRefs(useRobuxBuyStore())
</script>

<style scoped lang="scss">
.robux-buy-1 {
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
}
</style>
