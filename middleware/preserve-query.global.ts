export default defineNuxtRouteMiddleware((to, from) => {
  const keysToPreserve = ['channel']

  const preserved: Record<string, string> = {}

  keysToPreserve.forEach(key => {
    const fromValue = from.query[key]
    const toValue = to.query[key]

    // Сохраняем только если было раньше и отсутствует в новом маршруте
    if (fromValue && !toValue) {
      preserved[key] = fromValue as string
    }
  })

  if (!Object.keys(preserved).length) return

  return navigateTo({
    path: to.path,
    query: { ...preserved, ...to.query },
  })
})
