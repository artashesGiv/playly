<template>
  <div class="robux-buy-2">
    <div class="robux-buy-2__list">
      <robux-buy-item-card
        v-for="place in places"
        :key="place.place_id"
        :text="place.name"
        :is-error="errors[2].select"
        :src="place.image_url"
        :is-active="place.universe_id === stepsData.place?.universe_id"
        @click="onClick(place)"
      />
    </div>
    <transition-fade>
      <span v-if="errors[2].select" class="error description">
        {{ $t('robux.buy.errors.select_place') }}
      </span>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'
import type { RobloxPlace } from '@/types'

const { places, stepsData, errors } = storeToRefs(useRobuxBuyStore())

const onClick = (place: RobloxPlace) => {
  stepsData.value.place = place
  errors.value[2].select = false
}
</script>

<style scoped lang="scss">
.robux-buy-2 {
  @include column(18px);

  height: 100%;

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    grid-column: 50;
    max-height: calc(100vh - 293px);
    overflow-y: auto;
  }
}
</style>
