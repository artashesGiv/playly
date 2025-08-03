<template>
  <div class="item-case" :class="{ 'is-active': isActive }">
    <div class="item-case__tags">
      <ui-tag
        v-if="'rarity' in data && data.rarity"
        :text="$t(`rarity.${data.rarity}`)"
        :color="mapRareColor[data.rarity]"
      />
    </div>
    <nuxt-img
      :src="isCoinsItem ? '/images/main/mascot.png' : image_url"
      class="item-case__image"
    />
    <h5 class="item-case__title">
      {{
        isCoinsItem ? formatePrice(crystal_price || 0) : snakeToSentence(name)
      }}
    </h5>
    <span
      v-if="'item_type' in data && data.item_type"
      class="item-case__description"
    >
      {{ snakeToSentence(data.item_type) }}
    </span>
    <cases-item-abilities
      v-if="props.game === 'adopt_me'"
      :flyable="props.data.flyable"
      :rideable="props.data.rideable"
      class="item-case__abilities"
    />
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'

export type CaseRouletteItemCardProps = CaseItem & {
  isActive?: boolean
}

const props = defineProps<CaseRouletteItemCardProps>()

const { isCoinsItem } = useCaseGame(toRef(props))
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
    margin-top: 12px;
  }

  &.is-active {
    background-color: var(--dark-700);
  }
}
</style>
