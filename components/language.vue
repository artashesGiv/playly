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

const isOpen = ref<boolean>(false)
</script>

<style scoped lang="scss"></style>
