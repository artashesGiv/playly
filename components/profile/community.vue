<template>
  <div class="profile-community">
    <ui-title :text="$t('profile.community.title')" />
    <div class="profile-community__buttons">
      <ui-button-base
        icon="telegram"
        text="Playly"
        view="secondary"
        size="52"
        @click="onClickPlayly"
      />
      <ui-button-base
        icon="telegram"
        text="Starpets"
        view="secondary"
        size="52"
        @click="onClickStarpets"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()

const onClickPlayly = () => {
  tg?.openTelegramLink('https://t.me/playlygg')
}

const onClickStarpets = () => {
  tg?.openTelegramLink('https://t.me/starpetsgg')
}
</script>

<style scoped lang="scss">
.profile-community {
  &__buttons {
    @include row(12px);
  }
}
</style>
