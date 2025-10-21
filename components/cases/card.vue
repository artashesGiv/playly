<template>
  <div class="case-card">
    <div
      v-if="isBackground"
      class="case-card__gradient"
      :style="{
        background: `var(--${tagColorMap[category] || 'yellow'}-gradient)`,
      }"
    />
    <div class="case-card__tag">
      <ui-tag
        :text="snakeToSentence(category)"
        :color="tagColorMap[category]"
        size="s"
      />
      <ui-tag v-if="customTag" v-bind="customTag" size="s" />
    </div>

    <div class="case-card__content">
      <nuxt-img :src="image_url" class="case-card__image" />
      <h5>{{ $t(`case_names.${name}`) }}</h5>
    </div>

    <div class="case-card__price">
      <span :class="{ 'case-card__price--old': actualPrice }">
        {{ formatePrice(price) }}
      </span>
      <span v-if="actualPrice">{{ formatePrice(+actualPrice) }}</span>
      <main-mascot size="xs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Case } from '@/types'
import type { TagProps } from '@/components/ui/tag.vue'
import { tagColorMap } from '@/utils/map-rare-color'

export type CaseCard = Case & {
  customTag?: TagProps
  actualPrice?: number | string
  isBackground?: boolean
}

defineProps<CaseCard>()
</script>

<style scoped lang="scss">
.case-card {
  $b: &;

  @include column(10px);

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
  overflow: hidden;

  &__tag {
    @include column(4px);

    align-items: flex-start;
    position: absolute;
    top: 12px;
    left: 12px;
  }

  &__content {
    @include column(6px);

    align-items: center;
    margin: auto 0;
  }

  &__image {
    width: 104px;
    height: 104px;
  }

  &__price {
    @include row(4px);

    //margin-top: auto;
    justify-content: center;
    height: 32px;
    width: 100%;
    border-radius: 16px;
    font: var(--font-base-bold);
    background-color: var(--dark-600);
    transition: var(--transition-base);

    &--old {
      text-decoration: line-through;
      color: var(--light-500);
    }
  }

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
  }

  &:hover {
    background-color: var(--dark-700);

    #{$b}__price {
      background-color: var(--dark-500);
    }
  }
}
</style>
