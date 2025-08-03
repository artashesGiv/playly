<template>
  <div class="how-get-item-card">
    <div class="how-get-item-card__text">
      <h4>{{ cardDataMap[step].title }}</h4>
      <span>{{ cardDataMap[step].description }}</span>
    </div>
    <ui-button-base
      size="42"
      :text="cardDataMap[step].button"
      icon-right="foreign"
      class="how-get-item-card__button"
      @click="onOpenLink"
    />
    <nuxt-img :src="cardDataMap[step].image" class="how-get-item-card__image" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  step: number
}

type Data = {
  title: string
  description: string
  image: string
  button: string
}

defineProps<Props>()

const { t } = useI18n()
const { tg } = useTelegram()

const cardDataMap: Record<Props['step'], Data> = {
  1: {
    title: t('starPetsLink.how.step-1.title'),
    description: t('starPetsLink.how.step-1.description'),
    image: '/images/star-pets/link/step-1.png',
    button: t('starPetsLink.how.step-1.button'),
  },
  2: {
    title: t('starPetsLink.how.step-2.title'),
    description: t('starPetsLink.how.step-2.description'),
    image: '/images/star-pets/link/step-2.png',
    button: t('starPetsLink.how.step-1.button'),
  },
}

const onOpenLink = () => {
  tg?.openLink(
    'https://starpets.pw/profile?utm_source=tg&utm_medium=playly&utm_campaign=id',
  )
}
</script>

<style scoped lang="scss">
.how-get-item-card {
  @include row(12px);

  justify-content: space-between;
  position: relative;
  border-radius: 22px;
  background: linear-gradient(134.09deg, #1477dd 25.4%, #0371e2 92.78%);
  padding: 129px 14px 14px;
  overflow: hidden;

  &__text {
    @include column(2px);

    flex-grow: 1;
    position: relative;
    z-index: 2;

    h4 {
      color: var(--white);
      font: var(--font-base-semibold);
    }

    span {
      font: var(--font-normal-medium);
    }
  }

  &__button {
    position: relative;
    z-index: 2;
    width: auto;
  }

  &__image {
    @include center;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 119px;
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
</style>
