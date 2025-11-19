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

  const routeApp = useRoute()

  // Проверяем имя канала клиента
  const channel: Maybe<Clients> = routeApp.query.channel as Maybe<Clients>

  console.log(channel)

  if (channel && clientsMap[channel]) {
    console.log(11111)
    client.value = channel
  } else {
    console.log(22222)
    errorModalOpen.value = true
    return
  }

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

      if (param.startsWith('messageId')) {
        query.message_id = param.slice('messageId'.length)
      }
    })
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
