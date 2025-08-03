<template>
  <button
    :style="sizeStyle"
    :class="classes"
    :disabled="isDisabled"
    :type="type"
    @click="onClick"
  >
    <ui-spinner v-if="loading" v-bind="spinnerProps" />
    <template v-else>
      <ui-icon-base
        v-if="icon"
        :name="icon"
        :style="{ fontSize: `${iconFontSize[size]}px` }"
        class="button__icon"
      />
      <div v-if="text" class="button__text">
        {{ text }}
      </div>
      <ui-icon-base
        v-if="iconRight"
        :name="iconRight"
        :style="{ fontSize: `${iconFontSize[size]}px` }"
        class="button__icon"
      />
    </template>
  </button>
</template>

<script setup lang="ts">
import type { SpinnerProps } from '@/components/ui/Spinner.vue'
import type { CSSProperties } from 'vue'
import { fontBySize, iconFontSize, radiusBySize } from './-helpers'

// props
type ButtonView = 'primary' | 'secondary' | 'secondary-light' | 'icon'
type ButtonSize =
  | '30'
  | '32'
  | '34'
  | '36'
  | '38'
  | '40'
  | '42'
  | '44'
  | '46'
  | '48'
  | '50'
  | '52'
  | '54'
  | '56'
  | '58'
  | '60'

export type ButtonProps = {
  view?: ButtonView
  size?: ButtonSize
  icon?: Icons
  iconRight?: Icons
  text?: string
  type?: 'button' | 'submit' | 'reset'
  direction?: 'column' | 'row'
  isDisabled?: boolean
  maxContent?: boolean
  loading?: boolean
  rounded?: boolean
  squared?: boolean
  onClick?: () => void
  isEllipsis?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  view: 'primary',
  size: '40',
  type: 'button',
  direction: 'row',
  text: undefined,
  icon: undefined,
  iconRight: undefined,
  onClick: undefined,
})

// emits
const emit = defineEmits<ButtonEmit>()

const SPINNER_VIEW_MAP: Record<ButtonView, SpinnerProps['view']> = {
  'secondary-light': 'light',
  'primary': 'light',
  'secondary': 'light',
  'icon': 'dark',
}

type ButtonEmit = {
  (emit: 'click'): void
}

// computed
const classes = computed(() => {
  const classes = [
    'button',
    `button--view--${props.view}`,
    `button--size--${props.size}`,
    `button--direction--${props.direction}`,
    { 'max-content': props.maxContent },
    { ellipsis: props.isEllipsis },
    { 'is-error': props.isError },
  ]

  if (props.isDisabled || props.loading) {
    classes.push('is-disabled')
  }

  if (props.icon && !props.text) {
    classes.push('is-only-icon')
  }

  if (props.rounded) {
    classes.push('is-rounded')
  }

  if (props.squared) {
    classes.push('is-squared')
  }

  return classes
})

const sizeStyle = computed<CSSProperties>(() => {
  return {
    minWidth: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: `${radiusBySize[props.size]}px`,
    fontSize: `${fontBySize[props.size]}px`,
  }
})

// methods
// eslint-disable-next-line vue/no-dupe-keys
const onClick = () => {
  emit('click')
}

const spinnerProps = useSpinnerProps({ view: props.view })

function useSpinnerProps({
  view,
}: Pick<Required<ButtonProps>, 'view'>): SpinnerProps {
  return {
    view: SPINNER_VIEW_MAP[view],
    size: 's',
  }
}
</script>

<style lang="scss" scoped>
.button {
  $b: &;

  border: 1px solid transparent;
  outline: none;
  width: 100%;
  cursor: pointer;
  padding: 0 16px;
  white-space: nowrap;
  transition: var(--transition-base);
  max-width: 100%;
  font-weight: 600;

  &--direction {
    &--row {
      @include row(10px);

      justify-content: center;
    }

    &--column {
      @include column(4px);

      align-items: center;
      height: auto !important;
      padding-top: 14px;
      padding-bottom: 14px;
      font: var(--font-base-semibold);

      #{$b}__icon {
        font-size: 28px !important;
      }
    }
  }

  &--view {
    /* PRIMARY */
    &--primary {
      background-color: var(--primary-500);
      color: var(--white);

      &:hover {
        background-color: var(--primary-400);
      }

      &:active {
        background-color: var(--primary-400);
      }

      &.is-disabled {
        background-color: var(--primary-300);
      }
    }
    /* SECONDARY */
    &--secondary {
      background-color: var(--dark-800);
      color: var(--light-500);

      &:hover {
        background-color: var(--dark-700);
      }

      &:active {
        background-color: var(--dark-700);
      }

      &.is-disabled {
        background-color: var(--dark-900);
        color: var(--light-800);
      }
    }

    /* SECONDARY-LIGHT */
    &--secondary-light {
      background-color: var(--dark-700);
      color: var(--light-300);

      &:hover {
        background-color: var(--dark-600);
      }

      &:active {
        background-color: var(--dark-600);
      }

      &.is-disabled {
        background-color: var(--dark-900);
        color: var(--light-700);
      }
    }

    &--icon {
      background-color: transparent;
      color: var(--gray-300);

      &:hover {
        color: var(--primary-default);
      }

      &.is-disabled {
        opacity: 0.7;
      }
    }
  }

  &.is-disabled {
    @include disabled;
  }

  &.is-only-icon {
    width: auto;
    padding: 0;
  }

  &.is-rounded {
    border-radius: 100%;

    #{$b}__icon {
      font-size: 24px;
    }
  }

  &.is-squared {
    border-radius: 0;

    #{$b}__icon {
      font-size: 24px;
    }
  }

  &.max-content {
    width: auto;
  }

  &.ellipsis {
    #{$b}__text {
      @include ellipsis;
      width: max-content;
    }
  }

  &.is-error {
    border-color: var(--red-500);
  }
}
</style>
