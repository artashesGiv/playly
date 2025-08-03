<template>
  <div class="case-card">
    <div class="case-card__tag">
      <ui-tag
        :text="snakeToSentence(category)"
        :color="tagColorMap[category]"
        size="s"
      />
      <ui-tag v-if="customTag" v-bind="customTag" size="s" />
    </div>

    <nuxt-img :src="image_url" class="case-card__image" />
    <h5>{{ $t(`case_names.${name}`) }}</h5>
    <div class="case-card__price">
      {{ formatePrice(price) }} <main-mascot size="xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Case } from '@/types'
import type { TagProps } from '@/components/ui/tag.vue'

export type CaseCard = Case & {
  customTag?: TagProps
}

defineProps<CaseCard>()
</script>

<style scoped lang="scss">
.case-card {
  $b: &;

  @include column;

  position: relative;
  align-items: center;
  text-align: center;
  padding: 18px 6px 6px;
  border-radius: 22px;
  background-color: var(--dark-800);
  font: var(--font-base-semibold);
  color: var(--white);
  cursor: pointer;
  transition: var(--transition-base);

  &__tag {
    @include column(4px);

    align-items: flex-start;
    position: absolute;
    top: 12px;
    left: 12px;
  }

  &__image {
    width: 104px;
    height: 104px;
  }

  h5 {
    margin-top: 6px;
    margin-bottom: 10px;
  }

  &__price {
    @include row(4px);

    margin-top: auto;
    justify-content: center;
    height: 32px;
    width: 100%;
    border-radius: 16px;
    font: var(--font-base-bold);
    background-color: var(--dark-600);
    transition: var(--transition-base);
  }

  &:hover {
    background-color: var(--dark-700);

    #{$b}__price {
      background-color: var(--dark-500);
    }
  }
}
</style>
