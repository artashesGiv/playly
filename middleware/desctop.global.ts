export default defineNuxtRouteMiddleware(to => {
  const { tg } = useTelegram()
  const isTg = !!tg.initData

  const allowedRoute = ['/success', '/failed', '/robux']

  if (!isTg && !allowedRoute.includes(to.path)) {
    return navigateTo('/robux')
  }
})
