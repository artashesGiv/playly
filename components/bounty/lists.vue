<template>
  <div class="bounty-lists">
    <transition-fade>
      <div v-if="availableCards.length" class="bounty-lists__item">
        <ui-title
          :text="$t('coins.tasksTitle')"
          :additional-text="`${availableCards.length} ${$t('common.available')}`"
        />
        <transition-group name="fade-move">
          <component
            :is="componentsMap[card]"
            v-for="card in availableCards"
            :key="card"
            @click="onCompleted(card)"
          />
        </transition-group>
      </div>
    </transition-fade>

    <transition-fade>
      <div
        v-if="completedCards.length || friends.length"
        class="bounty-lists__item"
      >
        <ui-title
          :text="$t('coins.completeTitle')"
          :additional-text="`${completedCards.length + friends.length} ${$t('common.completed')}`"
        />
        <transition-group name="fade-move">
          <component
            :is="componentsMap[card]"
            v-for="card in completedCards"
            :key="card"
            is-disabled
          />
          <friend-card
            v-for="friend in friends"
            :key="friend.id"
            v-bind="friend"
          />
        </transition-group>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useFriendsStore, useUserStore } from '@/store'
import { useShareLink } from '@/composables/useShareLink'
import type { UserInfo } from '@/types'

type BountyCard =
  | 'playly-tg'
  | 'roblox-friend'
  | 'star-pets-tg'
  | 'star-pets-light'
type BountyCardStatus = Partial<Record<BountyCard, boolean>>
type BountyCardComponent = Record<BountyCard, Component>

const { tg, haptic } = useTelegram()
const { t } = useI18n()
const { userInfo } = storeToRefs(useUserStore())
const { getUserInfo } = useUserStore()
const { checkSubscription } = useAuthStore()
const { friends } = storeToRefs(useFriendsStore())

const tasks = computed<Maybe<UserInfo['tasks']>>(() => userInfo?.value?.tasks)

const map = computed<BountyCardStatus>(() => ({
  ...('playly_join_channel' in tasks.value! && {
    'playly-tg': tasks?.value?.playly_join_channel || false,
  }),
  ...('starpets_join_channel' in tasks.value! && {
    'star-pets-tg': tasks?.value?.starpets_join_channel || false,
  }),
  ...('starpets_light_join_channel' in tasks.value! && {
    'star-pets-light': tasks?.value?.starpets_light_join_channel || false,
  }),
  'roblox-friend': false,
}))

const componentsMap: BountyCardComponent = {
  'playly-tg': defineAsyncComponent(
    () => import('@/components/bounty/card/playly-tg.vue'),
  ),
  'roblox-friend': defineAsyncComponent(
    () => import('@/components/bounty/card/roblox-friend.vue'),
  ),
  'star-pets-tg': defineAsyncComponent(
    () => import('@/components/bounty/card/star-pets-tg.vue'),
  ),
  'star-pets-light': defineAsyncComponent(
    () => import('@/components/bounty/card/star-pets-light.vue'),
  ),
}

const availableCards = computed<BountyCard[]>(
  () =>
    Object.keys(map.value).filter(
      key => !map.value[key as BountyCard],
    ) as BountyCard[],
)
const completedCards = computed<BountyCard[]>(
  () =>
    Object.keys(map.value).filter(
      key => map.value[key as BountyCard],
    ) as BountyCard[],
)

const onCompleted = async (card: BountyCard) => {
  switch (card) {
    case 'playly-tg': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('playly')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink('https://t.me/+bmusTP1u7VMwMmJi')
      }
      break
    }

    case 'star-pets-tg': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('starpets')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink('https://t.me/+qDSL72dv7kI2N2My')
      }
      break
    }

    case 'star-pets-light': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('starpets-light')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink('https://t.me/+6P1jbEPGoBs5Njgy')
      }
      break
    }

    default: {
      useShareLink(t('invitation'))
    }
  }

  setTimeout(async () => {
    await getUserInfo()
  }, 3000)
}
</script>

<style scoped lang="scss">
.bounty-lists {
  @include column(16px);

  &__item {
    @include column(12px);
  }

  &__list {
    @include column(8px);
  }

  &__friends {
    @include column(8px);
  }
}
</style>
