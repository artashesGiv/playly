<template>
  <div class="profile-main">
    <nuxt-img
      class="profile-main__avatar"
      :src="tg?.initDataUnsafe.user?.photo_url"
    />
    <div class="profile-main__text">
      <h2>
        {{ tg?.initDataUnsafe.user?.first_name }}
        {{ tg?.initDataUnsafe.user?.last_name }}
      </h2>
      <span>{{ t('common.items', 45) }} {{ t('common.received') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
const { t } = useI18n()
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

  &__text {
    h2 {
      font: var(--font-large-semibold);
      color: var(--white);
    }

    span {
      font: var(--font-base-medium);
    }
  }
}
</style>
