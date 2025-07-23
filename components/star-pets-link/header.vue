<template>
  <div class="sp-link-header">
    <div class="sp-link-header__user">
      <nuxt-img :src="user?.photo_url" class="sp-link-header__avatar" />
      <span>
        {{ user?.first_name }}
        {{ user?.last_name }}
      </span>
    </div>
    <ui-icon-base name="link" class="sp-link-header__icon" />
    <div class="sp-link-header__sp">
      <div class="sp-link-header__link">
        <ui-icon-base v-if="!starpetsInfo" name="sp-logo" />
        <nuxt-img v-else :src="starpetsInfo.avatar" />
        <div v-if="starpetsInfo" class="sp-link-header__check">
          <ui-icon-base name="check" />
        </div>
      </div>
      <span v-if="!starpetsInfo">StarPets</span>
      <span v-else>{{ starpetsInfo.public_username }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const { user } = useTelegram()
const { starpetsInfo } = storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
.sp-link-header {
  @include row(18px);
  justify-content: center;

  &__icon {
    font-size: 24px;
  }

  &__user,
  &__sp {
    @include column(10px);

    span {
      @include ellipsis;

      display: block;
      width: 102px;
      font: var(--font-base-medium);
      color: var(--white);
      text-align: center;
    }
  }

  &__avatar,
  &__link {
    width: 102px;
    height: 102px;
    border-radius: 50%;
  }

  &__link {
    @include row;

    justify-content: center;
    background-color: var(--light-1000);
    position: relative;

    i {
      font-size: 54px;
    }
  }

  &__check {
    @include row;

    justify-content: center;
    background-color: var(--green-500);
    border-radius: 10px;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    bottom: 0;

    i {
      color: var(--white);
      font-size: 18px;
    }
  }
}
</style>
