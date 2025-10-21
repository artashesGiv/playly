<template>
  <div class="empty">
    <div class="empty__icon">
      <ui-icon-base name="search-1" />
    </div>
    <div class="empty__text">
      <span class="font-base-semibold">
        {{ title || $t('common.empty.title') }}
      </span>
      <span class="font-normal-medium">
        {{ description || $t('common.empty.description') }}
      </span>
    </div>
    <ui-button-base
      icon="delete-2"
      size="46"
      :text="buttonText || $t('common.empty.button')"
      @click="emit('clear')"
    />
  </div>
</template>

<script setup lang="ts">
export type EmptySearchBlockProps = {
  title?: string
  description?: string
  buttonText?: string
}

defineProps<EmptySearchBlockProps>()

type Emit = {
  (emit: 'clear'): void
}

const emit = defineEmits<Emit>()
</script>

<style scoped lang="scss">
.empty {
  @include column(16px);

  align-items: center;
  justify-content: center;
  background-color: var(--dark-900);
  height: 100%;
  border-radius: 22px;
  padding: 32px;

  &__icon {
    @include column;

    align-items: center;
    justify-content: center;
    background-color: var(--dark-700);
    border-radius: 18px;
    width: 62px;
    height: 62px;

    i {
      font-size: 28px;
    }
  }

  &__text {
    @include column(6px);

    text-align: center;

    span:first-child {
      color: var(--white);
    }
  }
}
</style>
