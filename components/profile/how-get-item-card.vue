<template>
  <div class="how-get-item-card">
    <ui-icon-base
      name="sp-logo"
      class="how-get-item-card__icon how-get-item-card__icon-1"
    />
    <ui-icon-base
      name="sp-logo"
      class="how-get-item-card__icon how-get-item-card__icon-2"
    />
    <div class="how-get-item-card__text">
      <h4>{{ cardDataMap[step].title }}</h4>
      <span>{{ cardDataMap[step].description }}</span>
    </div>
    <nuxt-img :src="cardDataMap[step].image" class="how-get-item-card__image" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  step: number
}

type Data = { title: string; description: string; image: string }

defineProps<Props>()

const { t } = useI18n()

const cardDataMap: Record<Props['step'], Data> = {
  1: {
    title: t('profile.howGetItem.cards.step-1.title'),
    description: t('profile.howGetItem.cards.step-1.description'),
    image: '/images/profile/how-get-item/step-1.png',
  },
  2: {
    title: t('profile.howGetItem.cards.step-2.title'),
    description: t('profile.howGetItem.cards.step-2.description'),
    image: '/images/profile/how-get-item/step-2.png',
  },
  3: {
    title: t('profile.howGetItem.cards.step-3.title'),
    description: t('profile.howGetItem.cards.step-3.description'),
    image: '/images/profile/how-get-item/step-3.png',
  },
}
</script>

<style scoped lang="scss">
.how-get-item-card {
  position: relative;
  border-radius: 22px;
  background: linear-gradient(134.09deg, #1477dd 25.4%, #0371e2 92.78%);
  padding: 69px 14px 14px;
  overflow: hidden;

  &__text {
    @include column(2px);

    color: var(--white);
    max-width: 55%;

    h4 {
      font: var(--font-base-semibold);
    }

    span {
      font: var(--font-normal-medium);
    }
  }

  &__icon {
    position: absolute;
    color: var(--white);

    &-1 {
      font-size: 50px;
      left: 20px;
      top: 16px;
      opacity: 0.1;
    }

    &-2 {
      font-size: 70px;
      left: 111px;
      top: -11px;
      opacity: 0.4;
    }
  }

  &__image {
    position: absolute;
    width: 257px;
    top: 0;
    right: -70px;
    object-fit: cover;
  }
}
</style>
