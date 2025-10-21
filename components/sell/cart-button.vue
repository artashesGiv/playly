<template>
  <transition-fade>
    <ui-button-base
      v-if="totalItems"
      icon="buy-1"
      :text="$t('sell.cart.button')"
      max-content
      size="50"
      class="cart-button"
      @click="navigateTo('/sell/cart')"
    >
      <template #badge>
        <div class="cart-button__badge">
          {{ countView(totalItems) }}
        </div>
      </template>
    </ui-button-base>
  </transition-fade>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'

const { totalItems } = storeToRefs(useSellStore())
</script>

<style scoped lang="scss"></style>
