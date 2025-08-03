export default defineNuxtPlugin(nuxtApp => {
  // Серверный рендер не трогаем
  if (import.meta.server) return // ⬇︎ Подключаем скрипт-«тег» один раз
  ;(function (
    m: any,
    e: any,
    t: string,
    r: string,
    i: string,
    k?: HTMLScriptElement,
    a?: Element,
  ) {
    m[i] =
      m[i] ||
      function () {
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    m[i].l = +new Date()

    for (let j = 0; j < e.scripts.length; j++) {
      if ((e.scripts[j] as HTMLScriptElement).src === r) return
    }

    k = e.createElement(t) as HTMLScriptElement
    a = e.getElementsByTagName(t)[0]
    k.async = true
    k.src = r
    a.parentNode!.insertBefore(k, a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

  // ⬇︎ Инициализируем счётчик
  const METRIKA_ID = 103_271_069
  ;(window as any).ym(METRIKA_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })

  // ⬇︎ Фиксация кликов по внутренним ссылкам (SPA-навигация)
  nuxtApp.$router.afterEach(to => {
    ;(window as any).ym(METRIKA_ID, 'hit', to.fullPath)
  })
})
