<template>
  <ui-card class="success-get-robux-card">
    <nuxt-img :src="user?.photo_url" class="success-get-robux-card__avatar" />
    <div class="success-get-robux-card__sum">
      <span>+{{ getValue }}</span>
      <ui-icon-base name="robux" class="success-get-robux-card__icon-robux" />
    </div>
    <span>{{ $t('robux.buy.step-6.cardText') }}</span>
    <ui-icon-base
      v-for="i in 3"
      :key="i"
      name="robux"
      class="success-get-robux-card__icon"
      :class="`success-get-robux-card__icon-${i}`"
    />
  </ui-card>
</template>

<script setup lang="ts">
export type SuccessGetRobuxCardProps = {
  getValue: number
}

defineProps<SuccessGetRobuxCardProps>()

const { user } = useTelegram()
</script>

<style scoped lang="scss">
.success-get-robux-card {
  @include column;

  position: relative;
  align-items: center;
  text-align: center;
  width: 100%;

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 18px;
  }

  &__sum {
    @include row(5px);

    margin-top: 10px;
    color: var(--white);

    span {
      font: var(--font-base-bold) !important;
    }
  }

  &__icon {
    position: absolute;
    color: var(--white);
    opacity: 0.2;

    &-robux {
      font-size: 22px;
      color: var(--yellow-500);
    }

    &-1 {
      font-size: 56px;
      top: 46px;
      left: 35px;
      opacity: 0.1;
    }
    &-2 {
      font-size: 54px;
      top: 23px;
      right: 51px;
    }
    &-3 {
      font-size: 40px;
      top: 86px;
      right: 20px;
      opacity: 0.1;
    }
  }
}
</style>
