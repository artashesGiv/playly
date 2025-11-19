<template>
  <div class="logo">
    <nuxt-img :src="clientsMap[client].logo" class="logo__square" />
    <span> {{ clientsMap[client].name }} </span>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'
import { clientsMap } from '@/assets/content'

const { client } = storeToRefs(useAuthStore())
</script>

<style scoped lang="scss">
.logo {
  @include row(4px);

  height: 30px;
  color: var(--white);
  font: var(--font-massive-bold);

  &__square {
    width: 26px;
  }
}
</style>
