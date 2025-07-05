<template>
  <div class="sp-link">
    <star-pets-link-header />
    <ui-divider />
    <star-pets-link-content v-model="valueId" class="sp-link__content" />
    <div class="sp-link__buttons">
      <ui-button-base
        :text="$t('common.save')"
        size="52"
        @click="setStarpetsID(valueId)"
      />
      <ui-button-base
        :text="$t('starPetsLink.buttons.starPetsId')"
        icon-right="information-circle"
        size="52"
        view="secondary"
        @click="navigateTo('/how-star-pets-link')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store'

definePageMeta({
  layout: 'empty',
})

const valueId = ref('')

useBackButton()

const { setStarpetsID } = useAuthStore()
</script>

<style scoped lang="scss">
.sp-link {
  @include column(18px);

  height: 100%;

  &__content {
    flex-grow: 1;
  }

  &__buttons {
    @include column(12px);
  }
}
</style>
