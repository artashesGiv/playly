export default defineNuxtPlugin(async () => {
  /** Загружаем telegram-web-app.js, если его ещё нет */
  const loadSdk = () =>
    new Promise<void>((resolve, reject) => {
      if (window.Telegram?.WebApp) return resolve()

      const s = document.createElement('script')
      s.src = 'https://telegram.org/js/telegram-web-app.js'
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error('TG SDK load failed'))
      document.head.appendChild(s)
    })

  /** Дожидаемся скрипта и инициализируем @twa-dev/sdk */
  await loadSdk()
})
