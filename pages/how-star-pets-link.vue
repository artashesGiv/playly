<template>
  <div class="how-star-pets-link">
    <div class="how-star-pets-link__header">
      <div class="how-star-pets-link__text">
        <h2 class="title">{{ $t('starPetsLink.how.title') }}</h2>
        <span class="description">
          {{ $t('starPetsLink.how.description') }}
        </span>
      </div>
    </div>
    <ui-divider />
    <div class="how-star-pets-link__content">
      <div class="how-star-pets-link__cards">
        <how-star-pets-link-card v-for="item in 2" :key="item" :step="item" />
      </div>
      <span class="description">{{ $t('starPetsLink.how.text') }}</span>
    </div>

    <ui-button-base
      :text="$t('common.gotIt')"
      size="52"
      @click="router.back()"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
useBackButton()
const router = useRouter()
</script>

<style scoped lang="scss">
.how-star-pets-link {
  @include column(18px);

  padding: 18px 0;

  .description {
    font: var(--font-base-medium);
  }

  &__content {
    @include column(18px);

    flex-grow: 1;
  }

  &__text {
    @include column(2px);
    text-align: center;
  }

  &__cards {
    @include column(12px);
  }
}
</style>
