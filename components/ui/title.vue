<template>
  <div class="title-base">
    <div class="title-base__left">
      <h3 class="title-base__text">
        {{ text }}
      </h3>
      <div v-if="count" class="title-base__count">{{ count }}</div>
    </div>

    <div v-if="additionalText" class="title-base__additional description">
      {{ additionalText }}
    </div>
  </div>
</template>

<script setup lang="ts">
export type TitleProps = {
  text: string
  additionalText?: string
  count?: number
}

defineProps<TitleProps>()
</script>

<style scoped lang="scss">
.title-base {
  @include row(12px);

  justify-content: space-between;
  padding-bottom: 12px;

  &__left {
    @include row(8px);
  }

  &__count {
    @include row;

    color: var(--white);
    font: (--font-small-bold);
    padding: 0 8px;
    border-radius: 10px;
    background-color: var(--primary-500);
    height: 24px;
  }

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
