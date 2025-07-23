import type {
  Gamepass,
  RobloxPlace,
  RobloxUser,
  Robux,
  RobuxBuySteps,
  RobuxTransactions,
} from '@/types'
import type { PayCard } from '@/components/pay-card.vue'
import { LocalStorageKeys } from '@/types/enums'
import { useAuthStore } from '@/store/auth'
import { paymentIdMap } from '@/utils/payment-id-map'

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useRobuxBuyStore = defineStore('robux-buy', () => {
  const searchName = ref('')
  const step = ref<RobuxBuySteps>(1)
  const stepsData = reactive<StepsData>(defaultStepsData())
  const users = ref<RobloxUser[]>([])
  const places = ref<RobloxPlace[]>([])
  const gamepasses = ref<Gamepass[]>([])
  const activePayType = ref<Maybe<PayCard['type']>>(null)
  const isDisable = ref(false)
  const email = ref('')
  const withdrawId = ref<Maybe<string>>(null)
  const amount = ref(0)
  const isEmailError = ref(false)
  const isPayTypeError = ref(false)
  const isFlashingGamepassButton = ref(false)
  const transactions = ref<RobuxTransactions[]>([])
  const stock = ref<number>(0)

  let timeout: Timeout

  const payValue = ref(769)

  const { rates } = storeToRefs(useAuthStore())
  const rate = computed(() => rates.value?.rub2robux || 1)

  const getValue = computed<number>({
    get: () => Math.round(payValue.value * rate.value),
    set: robux => {
      payValue.value = +(robux / rate.value).toFixed(2)
    },
  })

  const { tg, popup } = useTelegram()
  const { t } = useI18n()

  const resetStepsData = () => {
    step.value = 1
    searchName.value = ''
    users.value = []
    places.value = []
    gamepasses.value = []
    activePayType.value = null
    getValue.value = 1000
    email.value = ''
    withdrawId.value = null

    Object.assign(stepsData, defaultStepsData())
  }

  const fetchTransactions = async () => {
    await baseRequest({
      method: () => robuxAPI.fetchTransactions(),
      callback: result => (transactions.value = result),
    })
  }

  const fetchStock = async () => {
    await baseRequest({
      method: () => robuxAPI.fetchRobuxStock(),
      callback: result => {
        stock.value = result.stock_robux
      },
    })
  }

  const setStepsDataFromLocalStorage = (step: number) => {
    const stepsDataRaw = localStorage.getItem(
      LocalStorageKeys.STEPS_DATA_LOCAL_STORAGE_KEY,
    )

    if (!stepsDataRaw) return

    const localStepsData: StepsData & {
      amount: number
      places: RobloxPlace[]
      gamepasses: Gamepass[]
      email: string
      withdrawId: Maybe<string>
      activePayType: Maybe<PayCard['type']>
    } = JSON.parse(stepsDataRaw)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localStepsData.user && (users.value = [localStepsData.user])

    const {
      amount,
      places: currPlaces,
      gamepasses: currGamepasses,
      email: currEmail,
      withdrawId: currWithdrawId,
      activePayType: currActivePayType,
      user: userValue,
      ...otherData
    } = localStepsData

    if (step !== 1) {
      getValue.value = amount
    }
    places.value = currPlaces
    gamepasses.value = currGamepasses
    activePayType.value = currActivePayType
    email.value = currEmail
    withdrawId.value = currWithdrawId
    users.value = userValue ? [userValue] : []
    searchName.value = userValue ? userValue.name : ''

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
          users.value = result
          if (users.value.length === 1) {
            stepsData.user = users.value[0]
          }
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
        isFlashingGamepassButton.value = true
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

  const setWithdraw = async (
    stepsData: NonNullable<StepsData>,
    isWithdraw: boolean,
  ) => {
    await baseRequest({
      method: () =>
        robuxAPI.setWithdraw({
          username: stepsData.user!.name,
          roblox_id: stepsData.user!.roblox_id,
          universe_id: stepsData.place!.universe_id,
          gamepass_id: stepsData.gamepass!.id,
          robux_amount_without_fee: stepsData.robux_amount_without_fee,
          via_payment: !isWithdraw,
        }),
      callback: result => {
        withdrawId.value = result.withdraw_id
        amount.value = result.amount_rub
      },
    })
  }

  // STEP 5

  const payment = async (data: Robux.POST.Payment.Payload) => {
    const { uri } = await baseRequest({
      method: () => robuxAPI.payment(data),
    })

    return uri
  }

  // COMMON

  const nextStep = async (isWithdraw: boolean) => {
    switch (step.value) {
      case 1: {
        if (stepsData.user?.roblox_id) {
          try {
            isDisable.value = true
            await getPlaces(stepsData.user.roblox_id)
            stepsData.robux_amount_without_fee = getValue.value
            step.value += 1
          } catch (e) {
            console.error(e)
          } finally {
            isDisable.value = false
          }
        }

        break
      }
      case 2: {
        if (stepsData.place?.universe_id) {
          try {
            isDisable.value = true
            await getGamepasses(stepsData.place.universe_id)
            step.value += 1
          } catch (e) {
            console.error(e)
          } finally {
            isDisable.value = false
          }
        }

        break
      }
      case 3: {
        if (stepsData.gamepass?.id) {
          try {
            isFlashingGamepassButton.value = false
            step.value += 1
          } catch (e) {
            console.error(e)
          }
        } else {
          isDisable.value = true
          await getGamepasses(stepsData.place!.universe_id)
          isDisable.value = false
        }
        break
      }
      case 4: {
        try {
          isDisable.value = true
          await getGamepassPrice(
            stepsData.gamepass!.id,
            stepsData.place!.universe_id,
            stepsData.robux_amount_with_fee,
          )
          await setWithdraw(stepsData, isWithdraw)
          if (isWithdraw) {
            step.value += 2
          } else {
            step.value += 1
          }
        } catch (e) {
          isFlashingGamepassButton.value = true
          popup?.showAlert?.(t('robux.buy.step-4.error'))

          console.error(e)
        } finally {
          isDisable.value = false
        }
        break
      }
      case 5: {
        if (!emailRegex.test(email.value)) {
          isEmailError.value = true
        } else if (!activePayType.value) {
          isPayTypeError.value = true
        } else {
          isDisable.value = true
          try {
            const uri = await payment({
              email: email.value,
              payment_method_id: paymentIdMap[activePayType.value!]!,
              withdraw_id: withdrawId.value!,
            })

            console.log('QWEQWQWE: ', uri)

            tg.openLink(uri)
            // navigateTo('/robux')
          } catch {
            navigateTo('/robux/buy?step=5&error=true')
          } finally {
            isDisable.value = false
          }
        }

        break
      }
      case 6: {
        navigateTo('/robux')
        break
      }
    }
  }

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
        email: email.value,
        withdrawId: withdrawId.value,
        activePayType: activePayType.value,
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
    isDisable,
    transactions,
    email,
    withdrawId,
    amount,
    isEmailError,
    stock,
    isPayTypeError,
    isFlashingGamepassButton,
    resetStepsData,
    nextStep,
    getPlaces,
    getGamepasses,
    setWithdraw,
    setStepsDataFromLocalStorage,
    fetchTransactions,
    fetchStock,
  }
})
