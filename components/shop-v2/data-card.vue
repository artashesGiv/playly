<template>
  <ui-card class="data-card">
    <div class="data-card__item">
      <shop-v2-item-card v-bind="item" size="xs" />
      <!--      {{ item }}-->
      <div class="data-card__text">
        <span>{{ $t('market.steps.select_item') }}</span>
        <span>{{ snakeToSentence(item.name) }}</span>
      </div>
    </div>
    <ui-divider view="light" />
    <div class="data-card__item">
      <div class="data-card__image">
        <nuxt-img :src="game.image_url" />
      </div>
      <div class="data-card__text">
        <span>{{ $t('market.steps.select_game') }}</span>
        <span>{{ snakeToSentence(game.name) }}</span>
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
import type { ShopV2Game, ShopV2Item } from '@/types'

export type ShopV2DataCard = {
  item: {
    name: ShopV2Item['name']
    image_url: ShopV2Item['image_url']
    data?: ShopV2Item['data']
  }
  game: Pick<ShopV2Game, 'name' | 'image_url'>
}

defineProps<ShopV2DataCard>()
</script>

<style scoped lang="scss">
.data-card {
  @include column(14px);

  &__item {
    @include row(12px);
  }

  &__image {
    width: 62px;
    height: 62px;
    border-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    @include column(2px);

    span:first-child {
      font: var(--font-base-medium);
    }

    span:last-child {
      color: var(--white);
      font: var(--font-base-semibold);
    }
  }
}
</style>
