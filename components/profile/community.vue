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
  tg?.openTelegramLink('https://t.me/+bmusTP1u7VMwMmJi')
}

const onClickStarpets = () => {
  // tg?.openTelegramLink('https://t.me/+qDSL72dv7kI2N2My') // starpets
  tg?.openTelegramLink('https://t.me/+6P1jbEPGoBs5Njgy') // starpets light
}
</script>

<style scoped lang="scss">
.profile-community {
  &__buttons {
    @include row(12px);
  }
}
</style>
