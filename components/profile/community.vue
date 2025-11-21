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
        v-for="(link, index) in clientsLinks"
        :key="index"
        :icon="link.icon"
        :text="link.text"
        view="secondary"
        size="52"
        @click="onClickLink(link)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { clientsMap } from '@/assets/content'
import { useAuthStore } from '@/store'
import type { ClientLink } from '@/types'

const { tg } = useTelegram()
const { client } = storeToRefs(useAuthStore())

const onClickPlayly = () => {
  tg?.openTelegramLink('https://t.me/+bmusTP1u7VMwMmJi')
}

const clientsLinks = computed(() => {
  const clientData = clientsMap[client.value]

  if (Array.isArray(clientData.link)) {
    return clientData.link
  }

  return [clientData.link]
})

const onClickLink = (link: ClientLink) => {
  if (link.icon === 'telegram') {
    tg?.openTelegramLink(link.src)
  } else {
    tg?.openLink(link.src)
  }
}
</script>

<style scoped lang="scss">
.profile-community {
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    > * {
      flex: 0 0 calc(50% - 6px);
    }
    > *:nth-child(odd):last-child {
      flex: 0 0 100%;
    }
  }
}
</style>
