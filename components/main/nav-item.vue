<template>
  <nuxt-link :to="src" class="nav-item" active-class="nav-item--active">
    <main-mascot v-if="icon === 'mascot'" size="m" />
    <ui-icon-base v-else :name="icon" class="nav-item__icon" />
    <span>{{ text }}</span>
  </nuxt-link>
</template>

<script setup lang="ts">
export type NavItemProps = {
  src: NavItem['src']
  icon: NavItem['icon']
  text: NavItem['text']
}

defineProps<NavItemProps>()
</script>

<style scoped lang="scss">
.nav-item {
  $b: &;

  @include column(2px);

  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-base);
  color: var(--light-300);

  &__icon {
    transition: var(--transition-base);
    font-size: 32px;
    color: (--dark-300);
  }

  &:hover {
    #{$b}__icon {
      color: var(--dark-200);
    }

    color: var(--light-200);
  }

  &:active {
    #{$b}__icon {
      color: var(--dark-400);
    }

    color: var(--light-400);
  }

  &--active {
    color: var(--primary-500);

    &:hover {
      #{$b}__icon {
        color: var(--primary-600);
      }

      color: var(--primary-600);
    }

    &:active {
      #{$b}__icon {
        color: var(--primary-400);
      }

      color: var(--primary-400);
    }
  }
}
</style>
