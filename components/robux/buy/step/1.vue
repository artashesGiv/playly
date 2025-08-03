<template>
  <div class="robux-buy-1">
    <ui-input-base
      v-model="searchName"
      v-model:is-error="errors[1].input"
      :error-message="$t('robux.buy.errors.required_field')"
      :placeholder="$t('robux.buy.step-1.nicknamePlaceholder')"
      icon="profile-1"
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
            :is-error="errors[1].select"
            :is-active="user.roblox_id === stepsData.user?.roblox_id"
            @click="onClick(user)"
          />
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
import type { RobloxUser } from '@/types'

const { users, stepsData, searchName, errors } = storeToRefs(useRobuxBuyStore())

const onClick = (user: RobloxUser) => {
  stepsData.value.user = user
  errors.value[1].select = false
}
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
