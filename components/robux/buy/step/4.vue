<template>
  <div class="robux-buy-4">
    <div class="robux-buy-4__video">
      <ui-button-base icon="play" class="robux-buy-4__play" size="52" />
    </div>
    <ui-divider />
    <ui-button-base
      view="secondary"
      icon="foreign"
      size="52"
      :text="$t('robux.buy.step-4.setGamepass.button')"
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

const { stepsData } = storeToRefs(useRobuxBuyStore())
const { tg } = useTelegram()

const openLink = () => {
  tg?.openLink('https://create.roblox.com/dashboard/creations')
}
</script>

<style scoped lang="scss">
.robux-buy-4 {
  @include column(18px);

  &__video {
    position: relative;
    height: 218px;
    background-color: var(--dark-400);
    border-radius: 22px;
  }

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
