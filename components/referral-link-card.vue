<template>
  <ui-card class="referral-link">
    <ui-icon-base
      v-for="item in 2"
      :key="item"
      :class="['referral-link__icon', `referral-link__icon--${item}`]"
      name="ticket-2"
    />

    <div class="referral-link__right">
      <span class="title">{{ $t('referral_card.title') }}</span>
      <span class="description">{{ refLink }}</span>
    </div>
    <ui-button-base :icon size="52" @click="onClick" />
  </ui-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

const { refLink } = storeToRefs(useAuthStore())
const icon = ref<Icons>('copy-1')

const onClick = () => {
  if (refLink.value) {
    navigator.clipboard
      .writeText(refLink.value)
      .then(() => {
        console.log('Referral link copied:', refLink.value)
      })
      .catch(err => {
        console.error('Failed to copy referral link:', err)
      })
  }

  icon.value = 'check'
  setTimeout(() => {
    icon.value = 'copy-1'
  }, 2000)
}
</script>

<style scoped lang="scss">
.referral-link {
  @include row(12px);

  justify-content: space-between;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: 2;
  }

  &__right {
    @include column;
  }

  &__icon {
    position: absolute;

    &--1 {
      top: -16px;
      right: 140px;
      font-size: 54px;
    }
    &--2 {
      bottom: -11px;
      right: 110px;
      font-size: 44px;
    }
  }
}
</style>
