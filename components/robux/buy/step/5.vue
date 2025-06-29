<template>
  <div class="robux-buy-5">
    <ui-card class="robux-buy-5__card">
      <nuxt-img
        src="/images/template/user-avatar.png"
        class="robux-buy-5__avatar"
      />
      <div class="robux-buy-5__sum">
        <span>+345</span>
        <ui-icon-base name="robux" class="robux-buy-5__icon-robux" />
      </div>
      <span>{{ $t('robux.buy.step-5.cardText') }}</span>
      <ui-icon-base
        name="robux"
        class="robux-buy-5__icon robux-buy-5__icon-1"
      />
      <ui-icon-base
        name="robux"
        class="robux-buy-5__icon robux-buy-5__icon-2"
      />
      <ui-icon-base
        name="robux"
        class="robux-buy-5__icon robux-buy-5__icon-3"
      />
    </ui-card>
    <div class="robux-buy-5__alert">
      <span>{{ $t('robux.buy.step-5.alert') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.robux-buy-5 {
  @include column(18px);

  &__card {
    @include column;

    position: relative;
    align-items: center;
    text-align: center;
    width: 100%;
  }

  &__sum {
    @include row(5px);

    margin-top: 10px;
    color: var(--white);

    span {
      font: var(--font-base-bold) !important;
    }
  }

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 18px;
  }

  &__alert {
    font: var(--font-base-medium);
  }

  span {
    font: var(--font-base-medium);
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
