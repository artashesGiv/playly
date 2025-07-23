<template>
  <div class="robux-buy-4">
    <ui-video
      src="/videos/pay-gamepass.mp4"
      poster="/videos/pay-gamepass-poster.jpeg"
    />
    <ui-divider />
    <ui-button-base
      :text="$t('robux.buy.step-4.setGamepass.button')"
      :is-flashing="isFlashingGamepassButton"
      view="secondary"
      icon="foreign"
      size="52"
      @click="openLink()"
    />
    <span>
      {{ $t('robux.buy.step-4.setGamepass.description') }}
    </span>
    <ui-card class="robux-buy-4__price">
      <span class="robux-buy-4__price-description">
        {{ $t('robux.buy.step-4.setGamepass.priceDescription') }}
      </span>
      <div class="robux-buy-4__price-value">
        {{ stepsData.robux_amount_with_fee }}
        <ui-icon-base name="robux" class="robux-buy-4__icon-robux" />
      </div>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { stepsData, isFlashingGamepassButton } = storeToRefs(useRobuxBuyStore())
const { tg } = useTelegram()

const openLink = () => {
  isFlashingGamepassButton.value = false
  tg?.openLink(
    `https://create.roblox.com/dashboard/creations/experiences/${stepsData.value.place?.universe_id}/passes/${stepsData.value.gamepass?.id}/sales`,
  )
}
</script>

<style scoped lang="scss">
.robux-buy-4 {
  @include column(18px);

  &__play {
    @include center;
  }

  span {
    font: var(--font-base-medium);
  }

  &__price {
    @include row(12px);

    justify-content: space-between;

    &-value {
      @include row(5px);

      font: var(--font-base-semibold);
      color: var(--white);
    }

    &-description {
      font: var(--font-base-medium);
    }
  }

  &__icon-robux {
    font-size: 18px;
    color: var(--yellow-500);
  }
}
</style>
