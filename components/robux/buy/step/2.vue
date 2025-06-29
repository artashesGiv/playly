<template>
  <div class="robux-buy-2">
    <robux-buy-item-card
      v-for="place in places"
      :key="place.id"
      :text="place.text"
      :src="place.src"
      :is-active="place.id === stepsData.place"
      @click="stepsData.place = place.id"
    />
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { places, stepsData } = storeToRefs(useRobuxBuyStore())
</script>

<style scoped lang="scss">
.robux-buy-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  grid-column: 50;
  max-height: calc(100vh - 363px);
  overflow-y: auto;
}
</style>
