export default defineNuxtPlugin(async () => {
  await new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://telegram.org/js/telegram-web-app.js'
    s.onload = () => resolve(null)
    s.onerror = reject
    document.head.appendChild(s)
  })
})
