<template>
  <article class="case-item">
    <ui-tag
      :text="snakeToSentence(game)"
      :color="tagColorMap[game]"
      size="s"
      class="case-item__tag"
    />
    <div class="background" :style="backgroundStyle" />
    <nuxt-img :src="image_url" class="case-item__image" />
    <span>{{ snakeToSentence(name) }}</span>
    <div class="case-item__abilities">
      <cases-item-abilities
        v-if="props.game === 'adopt_me'"
        :flyable="props.data.flyable"
        :rideable="props.data.rideable"
        class="item-case__abilities"
      />
    </div>
    <div class="case-item__price">
      {{ formatePrice(crystal_price) }} <main-mascot size="xs" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'

export type CaseItemProps = CaseItem

const props = defineProps<CaseItemProps>()

const backgroundStyle = computed(() => {
  if ('rarity' in props.data) {
    return { background: `var(--${mapRareColor[props.data.rarity]}-gradient)` }
  }

  return { background: `var(--yellow-gradient)` }
})
</script>

<style scoped lang="scss">
.case-item {
  @include column;

  position: relative;
  align-items: center;
  text-align: center;
  background-color: var(--dark-900);
  padding: 12px 6px 6px;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-base);

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 118px;
    transition: var(--transition-base);
  }

  &__image {
    width: 60px;
    height: 60px;
    position: relative;
    margin-top: 20px;
    z-index: 2;
  }

  &__tag {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 3;
  }

  span {
    font: var(--font-normal-semibold);
    margin-top: 4px;
  }

  &__abilities {
    min-height: 30px;
    margin-top: 4px;
  }

  &__price {
    @include row(4px);

    margin-top: 18px;
    justify-content: center;
    height: 32px;
    width: 100%;
    border-radius: 16px;
    font: var(--font-normal-bold);
    background-color: var(--dark-600);
    transition: var(--transition-base);
    color: var(--white);
  }
}
</style>
