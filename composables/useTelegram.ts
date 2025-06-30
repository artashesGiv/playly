export const useTelegram = () => {
  const tg = (globalThis as any).Telegram?.WebApp as
    | Telegram['WebApp']
    | undefined

  const user = tg?.initDataUnsafe.user
  return { tg, user }
}
