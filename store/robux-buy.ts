import type {
  BuyRobuxData,
  Gamepass,
  RobloxPlace,
  RobloxUser,
  RobuxBuySteps,
} from '@/types'
import { useUserStore } from '@/store'
import type { PayCard } from '@/components/pay-card.vue'

type StepsData = BuyRobuxData & {
  robux_amount_with_fee: number
}

const defaultStepsData = () => ({
  username: '',
  roblox_id: 0,
  universe_id: 0,
  gamepass_id: 0,
  robux_amount_without_fee: 0,
  robux_amount_with_fee: 0,
})

const COEFFICIENT = 4

export const useRobuxBuyStore = defineStore('robux-buy', () => {
  const searchName = ref('')
  const step = ref<RobuxBuySteps>(1)
  const stepsData = reactive<StepsData>(defaultStepsData())
  const users = ref<RobloxUser[]>([])
  const places = ref<RobloxPlace[]>([])
  const gamepasses = ref<Gamepass[]>([])
  const activePayType = ref<Maybe<PayCard['type']>>(null)

  let timeout: Timeout

  const getValue = ref(1000)
  const payValue = ref(250)

  const { tg } = useTelegram()
  const { t } = useI18n()
  const { getUserInfo } = useUserStore()

  const resetStepsData = () => {
    step.value = 1
    searchName.value = ''
    users.value = []
    places.value = []
    gamepasses.value = []
    activePayType.value = null
    getValue.value = 1000

    Object.assign(stepsData, defaultStepsData())
  }

  // STEP 1
  const getUsers = () => {
    clearTimeout(timeout)

    if (searchName.value.length < 3) return

    timeout = setTimeout(async () => {
      await baseRequest({
        method: () => robuxAPI.fetchUserInfo(searchName.value.trim()),
        callback: result => {
          stepsData.username = ''
          users.value = result
        },
      })
    }, 500)
  }

  // STEP 2
  const getPlaces = async (user_id: RobloxUser['roblox_id']) => {
    await baseRequest({
      method: () => robuxAPI.fetchRobloxPlaces({ user_id }),
      callback: result => {
        places.value = result
      },
    })
  }

  // STEP 3
  const getGamepasses = async (universe_id: RobloxPlace['universe_id']) => {
    await baseRequest({
      method: () =>
        robuxAPI.fetchGamepasses({ robux_amount: getValue.value, universe_id }),
      callback: result => {
        gamepasses.value = result.gamepasses
        stepsData.robux_amount_with_fee = result.robux_amount_with_fee
      },
    })
  }

  // STEP 4

  const getGamepassPrice = async (
    gamepass_id: Gamepass['id'],
    universe_id: RobloxPlace['universe_id'],
    robux_amount_with_fee: number,
  ) => {
    await baseRequest({
      method: () =>
        robuxAPI.fetchGamepassPrice({
          gamepass_id,
          universe_id,
          robux_amount_with_fee,
        }),
    })
  }

  // STEP 5
  // STEP 6

  const setWithdraw = async () => {
    await baseRequest({
      method: () => robuxAPI.setWithdraw(stepsData),
    })
  }

  // COMMON

  const nextStep = async (isWithdraw: boolean) => {
    switch (step.value) {
      case 1: {
        if (stepsData.roblox_id) {
          try {
            await getPlaces(stepsData.roblox_id)
            stepsData.robux_amount_without_fee = getValue.value
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 2: {
        if (stepsData.universe_id) {
          try {
            await getGamepasses(stepsData.universe_id)
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 3: {
        if (stepsData.gamepass_id) {
          try {
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        } else {
          await getGamepasses(stepsData.universe_id)
        }
        break
      }
      case 4: {
        try {
          await getGamepassPrice(
            stepsData.gamepass_id,
            stepsData.universe_id,
            stepsData.robux_amount_with_fee,
          )
          if (isWithdraw) {
            step.value += 2
          } else {
            step.value += 1
          }
        } catch (e) {
          tg?.showAlert(t('robux.buy.step-4.error'))

          console.error(e)
        }
        break
      }
      case 5: {
        console.log('buy')
        step.value += 1
        break
      }
      case 6: {
        setWithdraw().then(async () => {
          await getUserInfo()
        })
        navigateTo('/robux')
        break
      }
    }
  }

  watch(payValue, newVal => {
    const calculated = newVal * COEFFICIENT
    if (getValue.value !== calculated) {
      getValue.value = calculated
    }
  })

  watch(getValue, newVal => {
    const calculated = newVal / COEFFICIENT
    if (payValue.value !== calculated) {
      payValue.value = calculated
    }
  })

  watch(searchName, () => {
    getUsers()
  })

  return {
    searchName,
    step,
    stepsData,
    places,
    users,
    gamepasses,
    getValue,
    payValue,
    activePayType,
    resetStepsData,
    nextStep,
    getPlaces,
    getGamepasses,
  }
})
