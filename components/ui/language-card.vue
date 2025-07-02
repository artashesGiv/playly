<template>
  <ui-card class="language" :class="{ 'is-active': isActive }">
    <div class="language__left">
      <nuxt-img :src="dataMap[language].image" class="language__image" />
      <span>{{ dataMap[language].name }}</span>
    </div>
    <div class="language__right">
      <span>{{ dataMap[language].text }}</span>
      <ui-icon-base v-if="type === 'card'" name="right-2" />
      <ui-icon-base v-else-if="isActive" name="check" />
    </div>
  </ui-card>
</template>

<script setup lang="ts">
export type LanguageCardProps = {
  language: LanguageCode
  type?: 'card' | 'select'
  isActive?: boolean
}

withDefaults(defineProps<LanguageCardProps>(), {
  isActive: false,
  type: 'card',
})

const dataMap: Record<
  LanguageCardProps['language'],
  {
    name: string
    text: string
    image: string
  }
> = {
  ru: {
    name: 'Russian',
    text: 'Русский',
    image: '/images/language/russia.png',
  },
  en: {
    name: 'English',
    text: 'English',
    image: '/images/language/usa.png',
  },
}
</script>

<style scoped lang="scss">
.language {
  @include row(12px);

  justify-content: space-between;
  height: 54px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition-base);

  &__image {
    width: 22px;
    height: 22px;
  }

  &__left,
  &__right {
    @include row(8px);

    i {
      font-size: 20px;
    }
  }

  &__left {
    font: var(--font-base-semibold);
  }

  &__right {
    font: var(--font-base-medium);
  }

  &.is-active {
    background-color: var(--dark-700);
    border-color: var(--dark-500);
  }
}
</style>
