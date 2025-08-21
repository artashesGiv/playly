<template>
  <div class="bounty-lists">
    <transition-fade>
      <div v-if="availableCards.length" class="bounty-lists__item">
        <ui-title
          :text="$t('coins.tasksTitle')"
          :additional-text="`${availableCards.length} ${$t('common.available')}`"
        />
        <transition-group name="fade-move">
          <bounty-card
            v-for="card in availableCards"
            :key="card"
            v-bind="mapPropsCard[card]"
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
          <bounty-card
            v-for="card in completedCards"
            :key="card"
            v-bind="mapPropsCard[card]"
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
import { type BountyCard, useBountyMaps } from './-helpers'

const { tg, haptic } = useTelegram()
const { t } = useI18n()
const { getUserInfo } = useUserStore()
const { checkSubscription } = useAuthStore()
const { friends } = storeToRefs(useFriendsStore())

const { mapLinkTasks, mapPropsCard, completedCards, availableCards } =
  useBountyMaps()

const onCompleted = async (card: BountyCard) => {
  switch (card) {
    case 'playly_join_channel': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('playly')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink(mapLinkTasks.playly_join_channel)
      }
      break
    }

    case 'starpets_join_channel': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('starpets')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink(mapLinkTasks.starpets_join_channel)
      }
      break
    }

    case 'starpets_light_join_channel': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('starpets-light')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink(mapLinkTasks.starpets_light_join_channel)
      }
      break
    }

    case 'playly_boost_channel': {
      haptic.impactOccurred('heavy')
      const data = await checkSubscription()
      if (data.channels_awarded.includes('playly-boost')) {
        await getUserInfo()
      } else {
        tg?.openTelegramLink(mapLinkTasks.playly_boost_channel)
      }
      break
    }

    case 'item_buy': {
      haptic.impactOccurred('heavy')
      navigateTo(mapLinkTasks.item_buy)
      break
    }
    case 'robux_buy_100':
    case 'robux_buy_500': {
      haptic.impactOccurred('heavy')
      navigateTo(mapLinkTasks.robux_buy_100)
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
