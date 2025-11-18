import { useCoinsStore, useUserStore } from '@/store'
import type { UserTasks } from '@/types'
import type { BountyCardProps } from '@/components/bounty/card.vue'

export type BountyCard = keyof UserTasks | 'roblox_friend'
export type BountyCardStatus = Partial<Record<BountyCard, boolean>>

const tasksDefault: UserTasks = {
  starpets_join_channel: false,
  playly_join_channel: false,
  starpets_light_join_channel: false,
  playly_boost_channel: false,
  robux_buy_100: false,
  robux_buy_500: false,
  item_buy: false,
}

export function useBountyMaps(): {
  mapPropsCard: ComputedRef<Record<BountyCard, BountyCardProps>>
  mapLinkTasks: Record<keyof UserTasks, string>
  availableCards: ComputedRef<BountyCard[]>
  completedCards: ComputedRef<BountyCard[]>
} {
  const { t } = useI18n()
  const { settings } = storeToRefs(useCoinsStore())

  const { userInfo } = storeToRefs(useUserStore())
  const tasks = computed<UserTasks>(
    () => userInfo?.value?.tasks || tasksDefault,
  )

  const mapPropsCard = computed<Record<BountyCard, BountyCardProps>>(() => ({
    playly_boost_channel: {
      sum: 500,
      type: 'boost',
      text: t('coins.tasks.boostPlayly'),
    },
    playly_join_channel: {
      sum: settings.value.channel_join_crystal_amount,
      text: t('coins.tasks.playlyTg'),
    },
    roblox_friend: {
      sum: settings.value.ref_crystal_amount,
      text: t('coins.tasks.inviteFriendFromRoblox'),
      type: 'invite',
    },
    starpets_light_join_channel: {
      sum: settings.value.channel_join_crystal_amount,
      text: t('coins.tasks.starPetsTgLight'),
    },
    starpets_join_channel: {
      sum: settings.value.channel_join_crystal_amount,
      text: t('coins.tasks.starPetsTg'),
    },
    item_buy: { sum: 1000, text: t('coins.tasks.itemBuy'), type: 'buy' },
    robux_buy_100: {
      sum: 1000,
      text: t('coins.tasks.robuxBuy100'),
      type: 'buy',
    },
    robux_buy_500: {
      sum: 5000,
      text: t('coins.tasks.robuxBuy500'),
      type: 'buy',
    },
  }))

  const mapLinkTasks: Record<keyof UserTasks, string> = {
    playly_boost_channel: 'https://t.me/boost?c=2541130061',
    starpets_light_join_channel: 'https://t.me/+6P1jbEPGoBs5Njgy',
    starpets_join_channel: 'https://t.me/+qDSL72dv7kI2N2My',
    playly_join_channel: 'https://t.me/+bmusTP1u7VMwMmJi',
    item_buy: '/shop',
    robux_buy_100: '/robux',
    robux_buy_500: '/robux',
  }

  const map = computed<BountyCardStatus>(() => ({
    roblox_friend: false,
    ...('playly_join_channel' in tasks.value! && {
      playly_join_channel: tasks?.value?.playly_join_channel || false,
    }),
    ...('starpets_join_channel' in tasks.value! && {
      starpets_join_channel: tasks?.value?.starpets_join_channel || false,
    }),
    ...('starpets_light_join_channel' in tasks.value! && {
      starpets_light_join_channel:
        tasks?.value?.starpets_light_join_channel || false,
    }),
    ...('playly_boost_channel' in tasks.value! && {
      playly_boost_channel: tasks?.value?.playly_boost_channel || false,
    }),
    ...('item_buy' in tasks.value! && {
      item_buy: tasks?.value?.item_buy || false,
    }),
    ...('robux_buy_100' in tasks.value! && {
      robux_buy_100: tasks?.value?.robux_buy_100 || false,
    }),
    ...('robux_buy_500' in tasks.value! && {
      robux_buy_500: tasks?.value?.robux_buy_500 || false,
    }),
  }))

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

  return { mapPropsCard, mapLinkTasks, availableCards, completedCards }
}
