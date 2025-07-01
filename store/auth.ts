export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false)
  const data = ref({})

  const login = async () => {
    const { tg } = useTelegram()

    await baseRequest({
      method: () =>
        authAPI.auth({
          init_data: tg?.initData || '',
          ref_code: tg?.initDataUnsafe.start_param || '',
          timezone_offset_minutes: 180,
        }),
      callback: result => {
        isAuth.value = true
        data.value = result
        // tg?.showAlert(JSON.stringify(result))
      },
      errorCallback: error => {
        // tg?.showAlert(tg?.initData)
        // data.value = {
        //   init_data: tg?.initData || '',
        //   ref_code: tg?.initDataUnsafe.start_param || '',
        //   timezone_offset_minutes: 180,
        // }
        data.value = error.data
      },
    })
  }

  return {
    isAuth,
    data,
    login,
  }
})
