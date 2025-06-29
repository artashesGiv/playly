<template>
  <ui-card class="roblox-user" :class="{ 'is-active': isActive }">
    <transition-fade>
      <div v-if="isActive" class="roblox-user__icon">
        <ui-icon-base name="check" />
      </div>
    </transition-fade>

    <nuxt-img class="roblox-user__avatar" :src="avatar" />
    <span>
      {{ name }}
    </span>
  </ui-card>
</template>

<script setup lang="ts">
export type RobloxUser = {
  name: string
  avatar: string
  isActive?: boolean
}

defineProps<RobloxUser>()
</script>

<style scoped lang="scss">
.roblox-user {
  @include column(6px);

  position: relative;
  align-items: center;
  background-color: var(--dark-800);
  transition: var(--transition-base);
  cursor: pointer;
  border: 2px solid transparent;

  &__avatar {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  &__icon {
    @include row;

    position: absolute;
    right: 12px;
    top: 12px;
    justify-content: center;
    background-color: var(--light-800);
    border-radius: 8px;
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  span {
    font: var(--font-normal-semibold);
    color: var(--white);
    word-break: break-word;
    text-align: center;
  }

  &:hover {
    background-color: var(--dark-700);
  }

  &.is-active {
    background-color: var(--dark-600);
    border-color: var(--light-800);

    &:hover {
      background-color: var(--dark-500);
      border-color: var(--light-700);
    }
  }
}
</style>
