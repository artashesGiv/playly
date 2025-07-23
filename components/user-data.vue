<template>
  <div class="user-data">
    <span>
      {{ tg?.initDataUnsafe?.user?.first_name }}
      {{ tg?.initDataUnsafe?.user?.last_name }}
    </span>
    <nuxt-img
      class="user-data__avatar"
      :src="tg?.initDataUnsafe?.user?.photo_url"
    />
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
</script>

<style scoped lang="scss">
.user-data {
  @include row(8px);

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
