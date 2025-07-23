<template>
  <ui-language-card
    :language="locale as LanguageCardProps['language']"
    @click="isOpen = true"
  />
  <language-modal v-model:is-open="isOpen" />
</template>

<script setup lang="ts">
import type { LanguageCardProps } from '@/components/ui/language-card.vue'

const { locale } = useI18n()
const { user } = useTelegram()
const { setLocale } = useI18n()

const isOpen = ref<boolean>(false)

onMounted(() => {
  setLocale((user?.language_code as LanguageCardProps['language']) || 'ru')
})
</script>

<style scoped lang="scss"></style>
