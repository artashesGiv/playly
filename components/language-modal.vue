<template>
  <ui-modal-base
    :is-open="isOpen"
    class="language-modal"
    :title="$t('language.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="language-modal__content">
      <div class="language-modal__list">
        <ui-language-card
          v-for="l in locales"
          :key="l.code"
          :is-active="l.code === locale"
          :language="l.code"
          type="select"
          @click="onSetLanguage(l.code)"
        />
      </div>
      <span>{{ $t('language.description') }}</span>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

export type LanguageModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<LanguageModalProps>()
const emits = defineEmits<Emits>()

const { locales, locale, setLocale } = useI18n()
const { setLang } = useAuthStore()

const onSetLanguage = async (lang: LanguageCode) => {
  await setLocale(lang)
  await setLang(lang)
}
</script>

<style scoped lang="scss">
.language-modal {
  &__content {
    @include column(18px);

    width: 100%;

    span {
      font: var(--font-base-medium);
    }
  }

  &__list {
    @include column(8px);
  }
}
</style>
