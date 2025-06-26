<template>
  <div class="friends">
    <div class="friends__wrapper">
      <div class="friends__main">
        <nuxt-img src="/images/friends/main.png" class="friends__image" />
        <div>
          <h3>Invite your friends and get coins</h3>
          <span>Get coins for each friend</span>
        </div>
      </div>
      <ui-divider />
      <div class="friends__data">
        <ui-title
          text="Invited friends"
          :additional-text="`${friends.length} friends`"
        />

        <div class="friends__list">
          <friend-card
            v-for="friend in friends"
            :key="friend.id"
            v-bind="friend"
          />
        </div>
      </div>
    </div>

    <ui-button-base class="friends__button" text="Invite friend" size="52" />
  </div>
</template>

<script setup lang="ts">
import { useFriendsStore } from '@/store'

const { friends } = storeToRefs(useFriendsStore())
</script>

<style scoped lang="scss">
.friends {
  @include column;

  position: relative;
  height: 100%;
  overflow: hidden;

  &__wrapper {
    @include column(18px);

    flex: 1;
    overflow-y: auto;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 120px;
      width: 100%;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(16, 15, 17, 0) 0%, #100f11 100%);
    }
  }

  &__main {
    @include column(14px);

    align-items: center;
    text-align: center;

    h3 {
      color: var(--white);
      font: var(--font-large-semibold);
    }

    span {
      font: var(--font-base-medium);
    }
  }

  &__image {
    height: 166px;
    width: 166px;
  }

  &__data {
    @include column;

    flex-grow: 1;
  }

  &__list {
    @include column(8px);

    padding-bottom: 8px;
  }

  &__button {
    position: relative;
    bottom: 0;
    width: 100%;
  }
}
</style>
