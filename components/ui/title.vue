<template>
  <div class="title-base">
    <h3 class="title-base__text">
      {{ text }}
    </h3>
    <div v-if="additionalText" class="title-base__additional description">
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
.title-base {
  @include row(12px);

  justify-content: space-between;
  padding-bottom: 12px;

  &__text {
    font: var(--font-large-medium);
  }

  &__additional {
    background-color: var(--dark-900);
    border-radius: 16px;
    padding: 10px 16px;
    white-space: nowrap;
  }
}
</style>
