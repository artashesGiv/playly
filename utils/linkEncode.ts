import { encode as b64 } from 'js-base64' // npm i js-base64

interface DeepLinkPayload {
  route: string
  ref?: string
  [k: string]: unknown
}

export function linkEncode(
  webAppName: string,
  payload: DeepLinkPayload,
): string {
  // 1. JSON → строка
  const json = JSON.stringify(payload)

  // 2. Стандартный путь без сжатия
  const encoded = b64(json) // обычная base64
    .replace(/\+/g, '-') // → URL-safe
    .replace(/\//g, '_')
    .replace(/=+$/, '') // убрать «=»

  // 3. Собираем ссылку
  return `https://t.me/${webAppName}?startapp=${encoded}`
}
