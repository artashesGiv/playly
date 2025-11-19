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
        :text="clientsMap[client].name"
        view="secondary"
        size="52"
        @click="onClickStarpets"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { clientsMap } from '@/assets/content'
import { useAuthStore } from '@/store'

const { tg } = useTelegram()
const { client } = storeToRefs(useAuthStore())

const onClickPlayly = () => {
  tg?.openTelegramLink('https://t.me/+bmusTP1u7VMwMmJi')
}

const onClickStarpets = () => {
  tg?.openTelegramLink(clientsMap[client.value].link)
}
</script>

<style scoped lang="scss">
.profile-community {
  &__buttons {
    @include row(12px);
  }
}
</style>
