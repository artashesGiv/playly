export const countView = (count: number, max = 99): string | number => {
  return count > max ? '99+' : count
}
