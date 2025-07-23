<template>
  <div class="friends">
    <div class="friends__wrapper">
      <div class="friends__main">
        <Lottie link="/lottie/friends.json" class="friends__image" />
        <div>
          <h3 class="title">{{ $t('friends.title') }}</h3>
          <span>{{ $t('friends.description') }}</span>
        </div>
      </div>
      <ui-divider />
      <div class="friends__data">
        <ui-title
          :text="$t('friends.listTitle')"
          :additional-text="`${$t('common.friends', friends.length)}`"
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

    <ui-button-base
      class="friends__button"
      :text="$t('friends.inviteButton')"
      size="52"
      @click="useShareLink($t('invitation'))"
    />
  </div>
</template>

<script setup lang="ts">
import { useFriendsStore } from '@/store'

const { friends } = storeToRefs(useFriendsStore())
</script>

<style scoped lang="scss">
.friends {
  @include column(18px);

  &__wrapper {
    @include column(18px);
  }

  &__main {
    @include column(14px);

    align-items: center;
    text-align: center;

    span {
      font: var(--font-base-medium);
    }
  }

  &__image {
    height: 160px;
  }

  &__data {
    @include column;
  }

  &__list {
    @include column(8px);
  }

  &__button {
    //position: relative;
    //bottom: 0;
    //width: 100%;
    //z-index: 2;
    //margin-top: auto;
    flex-shrink: 0;
  }
}
</style>
