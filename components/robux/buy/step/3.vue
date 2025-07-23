<template>
  <div class="robux-buy-3">
    <transition-fade>
      <div v-if="gamepasses.length" class="robux-buy-3__list-wrapper">
        <div class="robux-buy-3__list">
          <robux-buy-item-card
            v-for="gamepass in gamepasses"
            :key="gamepass.id"
            :text="gamepass.name"
            :src="gamepass.image_url"
            :is-active="gamepass.id === stepsData.gamepass?.id"
            @click="stepsData.gamepass = gamepass"
          />
        </div>
      </div>

      <div v-else class="robux-buy-3__create">
        <ui-video
          src="/videos/crate-gamepass.mp4"
          poster="/videos/crate-gamepass-poster.jpeg"
        />
        <ui-divider />

        <ui-button-base
          :text="$t('robux.buy.step-3.create.button')"
          :is-flashing="isFlashingGamepassButton"
          view="secondary"
          icon="foreign"
          size="52"
          @click="openLink"
        />

        <span>
          {{ $t('robux.buy.step-3.create.description') }}
        </span>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import { useRobuxBuyStore } from '@/store'

const { gamepasses, stepsData, isFlashingGamepassButton } =
  storeToRefs(useRobuxBuyStore())

const { tg } = useTelegram()

const openLink = () => {
  isFlashingGamepassButton.value = false
  tg?.openLink(
    `https://create.roblox.com/dashboard/creations/experiences/${stepsData.value.place?.universe_id}/passes/create`,
  )
}
</script>

<style scoped lang="scss">
.robux-buy-3 {
  height: 100%;

  &__list-wrapper {
    height: 100%;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    max-height: calc(100vh - 293px);
    gap: 10px;
    grid-column: 50;
    overflow-y: auto;
  }

  &__create {
    @include column(18px);
  }

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
}
</style>
