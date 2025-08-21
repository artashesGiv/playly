<template>
  <transition-fade>
    <ui-button-base
      v-if="totalCountCart"
      icon="buy-1"
      :text="$t('sell.cart.button')"
      max-content
      size="50"
      class="cart-button"
      @click="navigateTo('/sell/cart')"
    >
      <template #badge>
        <div class="cart-button__badge">
          {{ countView(totalCountCart) }}
        </div>
      </template>
    </ui-button-base>
  </transition-fade>
</template>

<script setup lang="ts">
import { useSellStore } from '@/store'

const { cart } = storeToRefs(useSellStore())

const totalCountCart = computed(() => {
  return Object.values(cart.value).reduce((acc, item) => acc + item.count, 0)
})
</script>

<style scoped lang="scss"></style>
