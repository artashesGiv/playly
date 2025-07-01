import { useAuthStore } from '@/store'

export default defineNuxtPlugin(async () => {
  const { login } = useAuthStore()

  await login()
})
