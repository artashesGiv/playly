<template>
  <div class="profile">
    <profile-main />
    <star-pets-link-card />
    <language-card :language="locale as LanguageCardProps['language']" />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-items-list type="own" />
    <ui-divider />
    <profile-items-list type="received" />
    <ui-button-base
      v-for="l in locales"
      :key="l.code"
      :view="l.code === locale ? 'primary' : 'secondary'"
      :text="l.name"
      @click="setLocale(l.code)"
    />

    {{ locale }}
  </div>
</template>

<script setup lang="ts">
import type { LanguageCardProps } from '@/components/language-card.vue'

const { locales, locale, setLocale } = useI18n()
</script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
