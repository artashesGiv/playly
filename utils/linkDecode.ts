import { Base64 } from 'js-base64' // npm i js-base64
// Optional: npm i lz-string   — если хотите сжать

export function linkDecode(data: string) {
  let result
  try {
    const json = Base64.decode(data)

    // 3. JSON → объект
    result = JSON.parse(json) as {
      route: string
      ref?: string
    }
  } catch {
    // return data
  }

  return result
}
