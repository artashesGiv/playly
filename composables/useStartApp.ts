import { useAuthStore } from '@/store'

export const useStartApp = async () => {
  const { tg } = useTelegram()
  const { setLang } = useAuthStore()
  const { locale } = useI18n()

  const raw =
    tg?.initDataUnsafe?.start_param ??
    new URLSearchParams(window.location.search).get('tgWebAppStartParam') // fallback на десктоп Web

  let ref = ''
  let route = ''
  if (raw) {
    if (raw.startsWith('ref') || raw.startsWith('link')) {
      ref = raw
    } else {
      try {
        const data = linkDecode(raw)
        ref = data?.ref || ''
        route = data?.route || ''
      } catch {
        console.error('not base64 params')
        ref = raw
      }
    }
  }
  await useLoginFlow(ref, route)
  setLang(locale.value as LanguageCode).then()
}

const useLoginFlow = async (ref: string, route?: string) => {
  const { login } = useAuthStore()
  const { tg } = useTelegram()

  try {
    const { first_enter } = await login(ref)

    if (first_enter) {
      await tg.requestWriteAccess()
      navigateTo('/onboarding')
      return
    }
  } catch {
    // ignore error and fall back to route navigation below
  }

  if (route) navigateTo(route)
}
