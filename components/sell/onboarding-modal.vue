<template>
  <ui-modal-base
    :is-open="isOpen"
    class="onboarding"
    :title="$t('sell.onboarding_modal.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="onboarding__content">
      <div class="banner onboarding__banner">
        <nuxt-img
          src="/images/sell/onboarding/banner.png"
          class="banner__image"
        />
        <div class="banner__text">
          <span class="title">
            {{ $t('sell.onboarding_modal.banner.title') }}
          </span>
          <span class="description">
            {{ $t('sell.onboarding_modal.banner.description') }}
          </span>
        </div>
      </div>

      <div class="card onboarding__info">
        <div class="card__title">
          <span class="title">
            {{ $t('sell.onboarding_modal.card.title') }}
          </span>
          <ui-icon-base name="robux" />
        </div>
        <ui-divider view="light" />
        <span class="description">
          {{ $t('sell.onboarding_modal.banner.description') }}
        </span>
      </div>

      <div class="onboarding__buttons">
        <ui-button-base
          :text="$t('sell.onboarding_modal.button')"
          size="52"
          @click="emits('update:isOpen', false)"
        />
        <ui-button-base
          :text="$t('sell.onboarding_modal.how_it_work_button')"
          view="secondary-light"
          icon-right="information-circle"
          size="52"
          @click="openHowItWork"
        />
      </div>
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
export type HowToWorkModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
  (e: 'openHowItWork'): void
}

defineProps<HowToWorkModalProps>()
const emits = defineEmits<Emits>()

const openHowItWork = () => {
  emits('update:isOpen', false)
  emits('openHowItWork')
}
</script>

<style scoped lang="scss">
.onboarding {
  &__content {
    @include column(18px);
  }

  &__buttons {
    @include column(12px);
  }
}

.banner {
  @include column;

  position: relative;
  justify-content: flex-end;
  padding: 14px;
  border-radius: 22px;
  height: 183px;
  background-color: var(--primary-500);

  &__text {
    @include column;
    z-index: 3;
  }

  &__image {
    @include center('horizontal');

    top: 0;
    z-index: 1;
    width: 345px;
  }

  .description {
    color: var(--white);
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 138px;
    background: linear-gradient(
      180deg,
      rgba(25, 24, 27, 0) 0%,
      rgba(25, 24, 27, 0.4) 19.22%,
      rgba(25, 24, 27, 0.6) 42.27%,
      rgba(25, 24, 27, 0.8) 59.75%,
      rgba(25, 24, 27, 0.9) 76.84%,
      #19181b 100%
    );
  }
}

.card {
  @include column(10px);

  padding: 14px;
  border-radius: 22px;
  background-color: var(--dark-700);

  &__title {
    @include row;
    justify-content: space-between;
  }

  .description {
    font: var(--font-base-medium);
  }
}
</style>
