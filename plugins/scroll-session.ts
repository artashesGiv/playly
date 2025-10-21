import { vScrollSession } from '@/utils/directives/v-scroll-session'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('scroll-session', vScrollSession)
})
