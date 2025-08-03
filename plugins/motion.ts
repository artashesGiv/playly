import { motion } from 'motion-v'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('motion.div', motion.div)
})
