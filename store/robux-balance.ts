export const useRobuxBalanceStore = defineStore('robux-balance', () => {
  const robuxBalance = ref(20)

  const addRobuxBalance = (value: number) => {
    robuxBalance.value += value
  }

  const onCountRobuxBalance = () => {
    addRobuxBalance(1)
  }

  return {
    robuxBalance,
    addRobuxBalance,
    onCountRobuxBalance,
  }
})
