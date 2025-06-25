export const useBalanceStore = defineStore('balance', () => {
  const balance = ref(450)

  const addBalance = (value: number) => {
    balance.value += value
  }

  const onCountBalance = () => {
    addBalance(1)
  }

  return {
    balance,
    addBalance,
    onCountBalance,
  }
})
