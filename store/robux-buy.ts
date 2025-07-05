import type {
  Gamepass,
  RobloxPlace,
  RobloxUser,
  RobuxBuySteps,
  WithdrawId,
} from '@/types'
import { useUserStore } from '@/store'

type StepsData = {
  user: Maybe<RobloxUser>
  place: Maybe<RobloxPlace>
  gamepass: Maybe<Gamepass>
  robux_amount_with_fee: number
}

const defaultStepsData = () => ({
  user: null,
  place: null,
  gamepass: null,
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
  const withdrawId = ref<WithdrawId>('')

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
          stepsData.user = null
          users.value = result
        },
      })
    }, 500)
  }

  const setCurrentUser = async (user: RobloxUser) => {
    await baseRequest({
      method: () =>
        robuxAPI.setUserInfo({
          username: user.name,
          roblox_id: user.roblox_id,
        }),
      callback: result => {
        withdrawId.value = result.withdraw_id
      },
    })
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

  const setCurrentPlace = async () => {
    await baseRequest({
      method: () =>
        robuxAPI.setRobloxPlace({
          place_id: stepsData.place!.place_id,
          roblox_user_id: stepsData.user!.roblox_id,
          universe_id: stepsData.place!.universe_id,
          withdraw_id: withdrawId.value,
        }),
    })
  }
  // STEP 3
  const getGamepasses = async (universe_id: RobloxPlace['universe_id']) => {
    await baseRequest({
      method: () => robuxAPI.fetchGamepasses({ universe_id }),
      callback: result => {
        gamepasses.value = result.gamepasses
      },
    })
  }

  const setCurrentGamepass = async (gamepass: Gamepass) => {
    await baseRequest({
      method: () =>
        robuxAPI.setGamepass({
          gamepass_id: gamepass.id,
          robux_amount_without_fee: getValue.value,
          withdraw_id: withdrawId.value,
        }),
      callback: result => {
        stepsData.robux_amount_with_fee = result.robux_amount_with_fee
      },
    })
  }

  // STEP 4

  const setPrice = async () => {
    await baseRequest({
      method: () => robuxAPI.setPrice({ withdraw_id: withdrawId.value }),
    })
  }

  // STEP 5

  const setWithdraw = async () => {
    await baseRequest({
      method: () => robuxAPI.setWithdraw({ withdraw_id: withdrawId.value }),
    })
  }

  // COMMON

  const nextStep = async () => {
    switch (step.value) {
      case 1: {
        if (stepsData.user) {
          try {
            await setCurrentUser(stepsData.user)
            await getPlaces(stepsData.user.roblox_id)
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 2: {
        if (stepsData.place) {
          try {
            await setCurrentPlace()
            await getGamepasses(stepsData.place.universe_id)
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        }

        break
      }
      case 3: {
        if (stepsData.gamepass) {
          try {
            await setCurrentGamepass(stepsData.gamepass)
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        } else {
          const universe_id = stepsData.place?.universe_id
          if (universe_id) {
            await getGamepasses(universe_id)
          }
        }
        break
      }
      case 4: {
        try {
          await setPrice()
          step.value += 1
        } catch (e) {
          tg?.showAlert(t('robux.buy.step-4.error'))

          console.error(e)
        }
        break
      }
      case 5: {
        await setWithdraw()
        await getUserInfo()
        navigateTo('/robux')
        break
      }
    }
  }

  const getCurrentWithdraw = async () => {
    await baseRequest({
      method: () => robuxAPI.fetchCurrentWithdraw(),
      callback: result => {
        console.log(result)
      },
    })
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
    resetStepsData,
    nextStep,
    getCurrentWithdraw,
    getPlaces,
    getGamepasses,
  }
})
