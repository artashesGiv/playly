export const useTelegram = () => {
  const tg = (globalThis as any).Telegram?.WebApp as
    | Telegram['WebApp']
    | undefined
  return { tg }
}
