<template>
  <div class="how-get-item">
    <div class="how-get-item__header">
      <div class="how-get-item__text">
        <h2 class="title">{{ $t('profile.howGetItem.title') }}</h2>
        <span class="description">
          {{ $t('profile.howGetItem.description') }}
        </span>
      </div>
    </div>
    <ui-divider />
    <div class="how-get-item__cards">
      <profile-how-get-item-card v-for="item in 3" :key="item" :step="item" />
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
.how-get-item {
  @include column(18px);

  height: 100%;

  &__text {
    @include column(2px);
    text-align: center;
  }

  &__cards {
    @include column(12px);

    flex-grow: 1;
  }
}
</style>
