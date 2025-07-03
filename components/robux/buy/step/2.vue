<template>
  <div class="robux-buy-2">
    <div class="robux-buy-2__list">
      <robux-buy-item-card
        v-for="place in places"
        :key="place.place_id"
        :text="place.name"
        :src="place.image_url"
        :is-active="place.place_id === stepsData.place?.place_id"
        @click="stepsData.place = place"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { places, stepsData } = storeToRefs(useRobuxBuyStore())
</script>

<style scoped lang="scss">
.robux-buy-2 {
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
