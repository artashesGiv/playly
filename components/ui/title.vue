<template>
  <div class="title">
    <h3 class="title__text">
      {{ text }}
    </h3>
    <div v-if="additionalText" class="title__additional">
      {{ additionalText }}
    </div>
  </div>
</template>

<script setup lang="ts">
export type TitleProps = {
  text: string
  additionalText?: string
}

defineProps<TitleProps>()
</script>

<style scoped lang="scss">
.title {
  @include row(12px);

  justify-content: space-between;
  padding-bottom: 12px;

  &__text {
    font: var(--font-large-medium);
  }

  &__additional {
    font: var(--font-normal-medium);
    background-color: var(--dark-900);
    border-radius: 16px;
    padding: 10px 16px;
  }
}
</style>
