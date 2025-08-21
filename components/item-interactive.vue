<template>
  <div class="item-interactive">
    <ui-button-base
      :text="$t('common.sell')"
      :is-disabled="disabled?.includes('sell')"
      :loading="loading?.includes('sell')"
      direction="column"
      view="secondary"
      icon="buy-1"
      @click="onClick('sell')"
    />
    <ui-button-base
      :text="$t('common.withdraw')"
      :is-disabled="disabled?.includes('withdraw')"
      :loading="loading?.includes('withdraw')"
      direction="column"
      view="secondary"
      icon="sp-logo"
      @click="onClick('withdraw')"
    />
    <ui-button-base
      :text="$t('common.share')"
      :loading="loading?.includes('share')"
      direction="column"
      view="secondary"
      icon="send-2"
      @click="onClick('share')"
    />
  </div>
</template>

<script setup lang="ts">
export type InteractiveProps = {
  disabled?: ('sell' | 'withdraw' | 'share')[]
  loading?: ('sell' | 'withdraw' | 'share')[]
}

type Emits = (e: 'sell' | 'withdraw' | 'share') => void

const emits = defineEmits<Emits>()
defineProps<InteractiveProps>()

const { haptic } = useTelegram()

const onClick = (type: 'sell' | 'withdraw' | 'share') => {
  haptic.impactOccurred('heavy')
  emits(type)
}
</script>

<style scoped lang="scss">
.item-interactive {
  @include row(10px);

  align-items: stretch;
}
</style>
