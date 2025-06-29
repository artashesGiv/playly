<template>
  <div class="item-case" :class="{ 'is-active': isActive }">
    <div class="item-case__tags">
      <ui-tag v-bind="tag" />
      <ui-tag :text="`${probability}%`" view="dark" />
    </div>
    <nuxt-img :src="image" class="item-case__image" />
    <h5 class="item-case__title">{{ name }}</h5>
    <span class="item-case__description">Egg</span>
    <div class="item-case__abilities">
      <cases-item-ability v-for="item in abilities" :key="item" :type="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'

export type CaseRouletteItemCardProps = {
  id: CaseItem['id']
  name: CaseItem['name']
  image: CaseItem['image']
  probability: CaseItem['probability']
  tag: CaseItem['tag']
  abilities: CaseItem['abilities']
  isActive?: boolean
}

defineProps<CaseRouletteItemCardProps>()
</script>

<style scoped lang="scss">
.item-case {
  @include column;

  position: relative;
  align-items: center;
  text-align: center;
  border-radius: 22px;
  background-color: var(--dark-900);
  padding: 18.5px 12px;
  transition: var(--transition-base);

  &__tags {
    @include row(6px);

    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__title {
    font: var(--font-base-semibold);
    color: var(--white);
    margin-top: 8px;
  }

  &__description {
    font: var(--font-normal-medium);
  }

  &__image {
    width: 90px;
    height: 90px;
  }

  &__abilities {
    @include row(6px);

    margin-top: 12px;
  }

  &.is-active {
    background-color: var(--dark-700);
  }
}
</style>
