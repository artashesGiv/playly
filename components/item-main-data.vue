<template>
  <div class="item-title">
    <nuxt-img class="item-title__image" :src="image" />
    <div class="item-title__text">
      <h4 class="title">{{ title }}</h4>
      <span>{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export type ItemTitleProps = {
  image: string
  title: string
  description: string
}

defineProps<ItemTitleProps>()
</script>

<style scoped lang="scss">
.item-title {
  @include column(18px);

  text-align: center;
  align-items: center;

  &__image {
    width: 134px;
    height: 134px;

    align-self: center;
  }

  &__text {
    span {
      font: var(--font-base-medium);
    }
  }
}
</style>
