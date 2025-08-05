declare global {
  interface Window {
    ym?: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    if (typeof window.ym !== 'function') {
      ;(function (
        m: any,
        e: Document,
        t: string,
        r: string,
        i: string,
        k?: HTMLScriptElement,
        a?: Element,
      ) {
        m[i] =
          m[i] ||
          function (...args: any[]) {
            ;(m[i].a = m[i].a || []).push(args)
          }
        m[i].l = 1 * new Date()
        for (let j = 0; j < e.scripts.length; j++) {
          if (e.scripts[j].src === r) return
        }
        k = e.createElement(t) as HTMLScriptElement
        a = e.getElementsByTagName(t)[0]
        k.async = true
        k.src = r
        a.parentNode?.insertBefore(k, a)
      })(
        window,
        document,
        'script',
        'https://mc.yandex.ru/metrika/tag.js',
        'ym',
      )
    }

    window.ym?.(103271069, 'init', {
      webvisor: true,
      clickmap: true,
      accurateTrackBounce: true,
      trackLinks: true,
    })
  }
})
