import {
  type Gamepass,
  LocalStorageKeys,
  type RobloxPlace,
  type RobloxUser,
  type RobuxBuySteps,
} from '@/types'
import type { PayCard } from '@/components/pay-card.vue'

type StepsData = {
  user: Maybe<RobloxUser>
  place: Maybe<RobloxPlace>
  gamepass: Maybe<Gamepass>
  robux_amount_without_fee: number
  robux_amount_with_fee: number
}

const defaultStepsData = (): StepsData => ({
  user: null,
  place: null,
  gamepass: null,
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
  const route = useRoute()

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

  const setStepsDataFromLocalStorage = () => {
    const stepsDataRaw = localStorage.getItem(
      LocalStorageKeys.STEPS_DATA_LOCAL_STORAGE_KEY,
    )

    if (!stepsDataRaw) return

    const localStepsData: StepsData & {
      amount: number
      places: RobloxPlace[]
      gamepasses: Gamepass[]
    } = JSON.parse(stepsDataRaw)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localStepsData.user && (users.value = [localStepsData.user])

    const {
      amount,
      places: currPlaces,
      gamepasses: currGamepasses,
      ...otherData
    } = localStepsData

    getValue.value = amount
    places.value = currPlaces
    gamepasses.value = currGamepasses

    Object.assign(stepsData, otherData)
  }

  // STEP 1
  const getUsers = () => {
    clearTimeout(timeout)

    if (searchName.value.length < 3) return

    timeout = setTimeout(async () => {
      await baseRequest({
        method: () => robuxAPI.fetchUserInfo(searchName.value.trim()),
        callback: result => {
          stepsData.user = null
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

  const setWithdraw = async (stepsData: NonNullable<StepsData>) => {
    await baseRequest({
      method: () =>
        robuxAPI.setWithdraw({
          username: stepsData.user!.name,
          roblox_id: stepsData.user!.roblox_id,
          universe_id: stepsData.place!.universe_id,
          gamepass_id: stepsData.gamepass!.id,
          robux_amount_without_fee: stepsData.robux_amount_without_fee,
        }),
    })
  }

  // COMMON

  const nextStep = async (isWithdraw: boolean) => {
    switch (step.value) {
      case 1: {
        if (stepsData.user?.roblox_id) {
          try {
            await getPlaces(stepsData.user.roblox_id)
            stepsData.robux_amount_without_fee = getValue.value
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 2: {
        if (stepsData.place?.universe_id) {
          try {
            await getGamepasses(stepsData.place.universe_id)
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 3: {
        if (stepsData.gamepass?.id) {
          try {
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        } else {
          await getGamepasses(stepsData.place!.universe_id)
        }
        break
      }
      case 4: {
        try {
          await getGamepassPrice(
            stepsData.gamepass!.id,
            stepsData.place!.universe_id,
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

  watch([step, getValue], () => {
    localStorage.setItem(
      LocalStorageKeys.STEPS_DATA_LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...stepsData,
        amount: getValue.value,
        places: places.value,
        gamepasses: gamepasses.value,
        step: step.value,
      }),
    )
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
    setWithdraw,
    setStepsDataFromLocalStorage,
  }
})
