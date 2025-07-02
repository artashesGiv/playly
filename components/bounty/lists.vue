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
      <div v-if="completedCards.length" class="bounty-lists__item">
        <ui-title
          :text="$t('coins.completeTitle')"
          :additional-text="`${completedCards.length} ${$t('common.completed')}`"
        />
        <transition-group name="fade-move">
          <component
            :is="componentsMap[card]"
            v-for="card in completedCards"
            :key="card"
            is-disabled
          />
        </transition-group>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { useShareLink } from '@/composables/useShareLink'

type BountyCard =
  | 'playly-friend'
  | 'playly-tg'
  | 'roblox-friend'
  | 'star-pets-tg'
type BountyCardStatus = Record<BountyCard, boolean>
type BountyCardComponent = Record<BountyCard, Component>

const { tg } = useTelegram()
const { userInfo } = storeToRefs(useUserStore())

const map = computed<BountyCardStatus>(() => ({
  'star-pets-tg': userInfo?.value?.tasks.starpets_join_channel || false,
  'playly-tg': userInfo?.value?.tasks.playly_join_channel || false,
  'playly-friend': false,
  'roblox-friend': false,
}))

const componentsMap: BountyCardComponent = {
  'playly-friend': defineAsyncComponent(
    () => import('@/components/bounty/card/playly-friend.vue'),
  ),
  'playly-tg': defineAsyncComponent(
    () => import('@/components/bounty/card/playly-tg.vue'),
  ),
  'roblox-friend': defineAsyncComponent(
    () => import('@/components/bounty/card/roblox-friend.vue'),
  ),
  'star-pets-tg': defineAsyncComponent(
    () => import('@/components/bounty/card/star-pets-tg.vue'),
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

const onCompleted = (card: BountyCard) => {
  switch (card) {
    case 'playly-tg': {
      tg?.openTelegramLink('https://t.me/playlygg')
      break
    }

    case 'star-pets-tg': {
      tg?.openTelegramLink('https://t.me/starpetsgg')
      break
    }

    default: {
      useShareLink()
    }
  }
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
}
</style>
