<template>
  <div class="item-interactive">
    <ui-button-base
      :text="$t('common.sell')"
      :is-disabled="disabled?.includes('sell')"
      direction="column"
      view="secondary"
      icon="buy-1"
      @click="emits('sell')"
    />
    <ui-button-base
      :text="$t('common.withdraw')"
      :is-disabled="disabled?.includes('withdraw')"
      direction="column"
      view="secondary"
      icon="sp-logo"
      @click="emits('withdraw')"
    />
    <ui-button-base
      :text="$t('common.share')"
      :is-disabled="disabled?.includes('share')"
      direction="column"
      view="secondary"
      icon="send-2"
      @click="emits('share')"
    />
  </div>
</template>

<script setup lang="ts">
export type InteractiveProps = {
  disabled?: ('sell' | 'withdraw' | 'share')[]
}

type Emits = (e: 'sell' | 'withdraw' | 'share') => void

const emits = defineEmits<Emits>()
defineProps<InteractiveProps>()
</script>

<style scoped lang="scss">
.item-interactive {
  @include row(10px);
}
</style>
