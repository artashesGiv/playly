<template>
  <div class="sp-content">
    <div class="sp-content__text">
      <h2 class="title">
        {{ $t(`starPetsLink.${starpetsInfo ? 'edit_' : ''}title`) }}
      </h2>
      <span class="description">
        {{ $t(`starPetsLink.${starpetsInfo ? 'edit_' : ''}description`) }}
      </span>
    </div>
    <ui-input-base
      v-model="model!"
      :icon-right="starpetsInfo ? 'check' : undefined"
      :placeholder="$t('starPetsLink.placeholder')"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

export type StarPetsLinkProps = {
  modelValue: string
}

defineProps<StarPetsLinkProps>()

const model = defineModel<StarPetsLinkProps['modelValue']>()

const { starpetsInfo } = storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
.sp-content {
  @include column(18px);

  text-align: center;

  &__text {
    @include column(2px);

    .description {
      font: var(--font-base-medium);
    }
  }
}
</style>
