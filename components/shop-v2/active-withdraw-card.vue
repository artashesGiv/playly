<template>
  <div class="active-withdraws-card" @click="navigateTo('/shop-v2/orders')">
    <div class="active-withdraws-card__left">
      <div class="active-withdraws-card__icon-wrapper">
        <ui-icon-base name="loader-2" />
      </div>
    </div>
    <div class="active-withdraws-card__center">
      <span class="font-base-semibold">
        {{ $t('market.active_withdraws_card.title') }}
      </span>
      <span class="font-base-medium">
        {{ $t('market.active_withdraws_card.description') }}
      </span>
    </div>
    <div class="active-withdraws-card__right">
      <ui-icon-base name="right-2" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.active-withdraws-card {
  @include row(10px);

  border: 2px solid var(--dark-600);
  background-color: var(--dark-800);
  border-radius: 16px;
  padding: 10px;

  cursor: pointer;
  transition: var(--transition-base);

  &:hover {
    background-color: var(--dark-900);
  }

  &__icon-wrapper {
    @include row;

    justify-content: center;

    height: 48px;
    width: 48px;
    background-color: var(--dark-600);
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;

    i {
      font-size: 20px;
    }
  }

  &__center {
    @include column;

    flex-grow: 1;

    span:first-of-type {
      color: var(--white);
    }
  }

  &__right {
    @include row;

    i {
      font-size: 22px;
    }
  }
}
</style>
