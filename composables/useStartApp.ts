import { useAuthStore } from '@/store'
import type { Clients } from '@/types'
import { clientsMap } from '@/assets/content'

export const useStartApp = async () => {
  const { tg } = useTelegram()
  const { setLang } = useAuthStore()
  const { client, errorModalOpen } = storeToRefs(useAuthStore())
  const { locale } = useI18n()

  const raw =
    tg?.initDataUnsafe?.start_param ??
    new URLSearchParams(window.location.search).get('tgWebAppStartParam') // fallback на десктоп Web

  let ref = ''
  let route = '/'
  const query: Record<string, string> = {}
  let isValidChannel = false

  if (raw) {
    const params = raw.split('_')
    params.forEach(param => {
      if (param.startsWith('ref')) {
        ref = param
      }

      if (param.startsWith('item')) {
        const id = param.slice('item'.length)

        route = `/item/${id}`
      }

      if (param.startsWith('channel')) {
        const channel = param.slice('channel'.length) as Clients

        if (clientsMap[channel]) {
          client.value = channel
          isValidChannel = true
        }
      }

      if (param.startsWith('messageId')) {
        query.message_id = param.slice('messageId'.length)
      }
    })
  }

  if (!isValidChannel) {
    errorModalOpen.value = true
    return
  }

  if (Object.keys(query).length) {
    const search = new URLSearchParams(query).toString()
    route += `?${search}`
  }

  await useLoginFlow(ref, route)
  setLang(locale.value as LanguageCode).then()
}

const useLoginFlow = async (ref: string, route?: string) => {
  const { login } = useAuthStore()
  const { tg } = useTelegram()

  try {
    const { first_enter, access_token } = await login(ref)
    useWs(access_token)

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
