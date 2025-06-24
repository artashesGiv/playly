<template>
  <div :class="`spinner spinner--size--${size}`">
    <svg v-bind="svgAttrs">
      <defs>
        <linearGradient :id="gradientsId.a">
          <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
          <stop offset="100%" stop-opacity=".5" stop-color="currentColor" />
        </linearGradient>
        <linearGradient :id="gradientsId.b">
          <stop offset="0%" stop-color="currentColor" />
          <stop offset="100%" stop-opacity=".5" stop-color="currentColor" />
        </linearGradient>
      </defs>
      <g stroke-width="15">
        <path
          :stroke="`url(#${gradientsId.a})`"
          d="M15 100a85 85 0 0 1 170 0"
        />
        <path
          :stroke="`url(#${gradientsId.b})`"
          d="M185 100a85 85 0 0 1-170 0"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type SpinnerView = 'primary' | 'dark' | 'light'

export type SpinnerProps = {
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'
  view?: SpinnerView
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 's',
  view: 'primary',
})

const gradientsId = computed(() => ({
  a: `spinner-a-${Math.random().toString(36).substring(2, 15)}`,
  b: `spinner-b-${Math.random().toString(36).substring(2, 15)}`,
}))

const svgAttrs = computed(() => {
  const mapColors: Record<SpinnerView, string> = {
    dark: '#0e1117',
    primary: '#70f',
    light: '#fff',
  }

  return {
    color: mapColors[props.view || 'primary'],
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 200 200',
    width: '200',
    height: '200',
  }
})
</script>

<style scoped lang="scss">
.spinner {
  position: relative;
  border-radius: 100%;
  overflow: hidden;

  img,
  svg {
    display: block;
    width: 100%;
    height: 100%;
    animation: rotate360 1s infinite linear;
  }

  &--size {
    &--s {
      width: 20px;
      height: 20px;
    }

    &--m {
      width: 36px;
      height: 36px;
    }

    &--l {
      width: 50px;
      height: 50px;
    }

    &--xl {
      width: 64px;
      height: 64px;
    }

    &--xxl {
      width: 100px;
      height: 100px;
    }

    &--3xl {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
