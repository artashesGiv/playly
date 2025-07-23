<template>
  <div class="profile-main">
    <nuxt-img class="profile-main__avatar" :src="user?.photo_url" />
    <div class="profile-main__text">
      <h2 class="title">
        {{ user?.first_name }}
        {{ user?.last_name }}
      </h2>
      <span class="description">
        {{ $t('common.items', items.length) }} {{ $t('common.received') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '@/store'

const { user } = useTelegram()

const { items } = storeToRefs(useItemsStore())
</script>

<style scoped lang="scss">
.profile-main {
  @include column(18px);

  align-items: center;
  text-align: center;

  &__avatar {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }
}
</style>
