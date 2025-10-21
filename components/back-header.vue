<template>
  <div class="back-header">
    <ui-button-base
      icon="left-2"
      size="52"
      view="secondary"
      @click="onClickBack"
    />
    <div class="back-header__text">
      <span class="font-large-semibold">{{ title }}</span>
      <span v-if="description" class="font-base-medium">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// type
export type BackHeaderProps = {
  title: string
  description?: string
  onClick?: () => void
}

// define
const props = defineProps<BackHeaderProps>()

// data
const router = useRouter()

// methods
const onClickBack = () => {
  if (props.onClick) {
    props.onClick()
    return
  }

  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.back-header {
  @include row(12px);

  &__text {
    @include column;

    span:first-child {
      color: var(--white);
    }
  }
}
</style>
