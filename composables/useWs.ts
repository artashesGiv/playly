import { useWebSocket } from '@vueuse/core'
import type { WithdrawSocketData } from '@/types'
import { useShopV2Store } from '@/store'

interface SocketMessage {
  type: string
  payload?: any
}

let socketInstance: ReturnType<typeof useWebSocket<SocketMessage>> | null = null

export function useWs(accessToken?: string) {
  const { getWithdraws } = useShopV2Store()
  const route = useRoute()

  if (!socketInstance && accessToken) {
    const wsUrl = new URL('wss://api.playly.gg/ws')
    wsUrl.searchParams.set('access_token', accessToken)

    socketInstance = useWebSocket<SocketMessage>(
      `wss://api.playly.gg/ws?access_token=${accessToken}`,
      {
        onConnected: ws => {
          console.info('[WebSocket] Connected:', ws.url)
        },
        onDisconnected: (_, event) => {
          console.warn(
            '[WS] close',
            event?.code,
            event?.reason,
            event?.wasClean,
          )
        },
        onError: error => {
          console.error('[WebSocket] Error:', error)
        },
        onMessage: async (_, event) => {
          console.log('SOCKET EVENT: ', event)

          // TODO вынесли слушатель
          const eventData = JSON.parse(event.data)
          console.log('EVENT DATA', eventData)
          if (eventData.withdraw_id) {
            const withdrawData = eventData as WithdrawSocketData
            await getWithdraws()

            console.log('ROUTE', route.fullPath)
            if (route.fullPath === '/shop-v2/flow') {
              navigateTo(
                `/shop-v2/orders?withdraw_id=${withdrawData.withdraw_id}`,
              )
            }
          }
        },
      },
    )
  }

  const send = (type: string, payload?: any) => {
    const message = JSON.stringify({ type, payload })
    socketInstance?.send(message)
  }

  return {
    ...socketInstance!,
    send,
  }
}
