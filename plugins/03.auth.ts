import { useAuthStore } from '@/store'

export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['telegram'],
  async setup() {
    const { login } = useAuthStore()

    await login()
  },
})
