<template>
  <div :class="classes">
    <div class="input__content">
      <slot name="icon">
        <ui-icon-base v-if="icon" class="input__icon-left" :name="icon" />
      </slot>
      <input
        v-model="model"
        :type="type"
        class="input__value"
        :enterkeyhint="enterkeyhint"
        :placeholder="placeholder"
        @input="onInput"
        @keydown.enter.prevent.stop="onDone"
      />
      <span v-if="label" class="input__label">{{ label }}</span>
      <ui-icon-base v-if="isError" class="input__icon-error" name="alert" />
      <ui-icon-base
        v-if="iconRight"
        class="input__icon-left"
        :name="iconRight"
      />
    </div>
    <div
      v-if="isError && errorMessage"
      class="input__error-message description"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
export type InputBaseProps = {
  modelValue: string | number
  isError?: boolean
  placeholder?: string
  icon?: Icons
  iconRight?: Icons
  label?: string
  errorMessage?: string
  iconColor?: 'base' | 'yellow'
  postfix?: string
  type?: 'text' | 'number' | 'email'
  isDisabled?: boolean
  enterkeyhint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
}

type InputEmits = {
  (emit: 'update:modelValue', value: InputBaseProps['modelValue']): void
  (emit: 'update:is-error', value: InputBaseProps['isError']): void
}

const props = withDefaults(defineProps<InputBaseProps>(), {
  iconColor: 'base',
  enterkeyhint: 'done',
  type: 'text',
  placeholder: '',
  icon: undefined,
  iconRight: undefined,
  label: '',
  errorMessage: '',
  postfix: '',
})
const emit = defineEmits<InputEmits>()
const model = defineModel<InputBaseProps['modelValue']>()

const classes = computed(() => [
  'input',
  { 'is-error': props.isError },
  { 'is-disabled': props.isDisabled },
  `input--icon-color--${props.iconColor}`,
])

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
  emit('update:is-error', false)
}

const onDone = (event: KeyboardEvent) => {
  ;(event.target as HTMLInputElement).blur()
}

onMounted(() => {
  document.addEventListener('touchstart', handleTouchOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('touchstart', handleTouchOutside)
})

function handleTouchOutside(event: TouchEvent) {
  const target = event.target as HTMLElement | null
  const active = document.activeElement as HTMLElement | null

  if (
    active &&
    (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') &&
    target &&
    !target.closest('input, textarea, .input__content')
  ) {
    active.blur()
  }
}
</script>

<style scoped lang="scss">
.input {
  $b: &;

  @include column(6px);

  &__content {
    @include row(12px);

    padding: 0 14px;
    background-color: var(--dark-900);
    border-radius: 18px;
    height: 52px;
  }

  &__value {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font: var(--font-base-medium);
    color: var(--white);
    background-color: transparent;

    &::placeholder {
      color: var(--light-700);
    }
  }

  &__error-message {
    align-self: flex-end;
    color: var(--red-500);
  }

  &__label {
    font: var(--font-base-medium);
    color: var(--light-700);
    white-space: nowrap;
  }

  &__icon {
    &-left {
      font-size: 22px;
    }

    &-error {
      color: var(--red-500);
      font-size: 20px;
    }
  }

  &--icon-color {
    &--base {
      #{$b}__icon-left {
        color: inherit;
      }
    }

    &--yellow {
      #{$b}__icon-left {
        color: var(--yellow-500);
      }
    }
  }

  &.is-error {
    color: var(--red-500);
  }

  &.is-disabled {
    @include disabled;

    opacity: 0.7;
  }
}
</style>
