<template>
  <article class="write-access-banner">
    <nuxt-img
      src="/images/profile/write-access-banner.png"
      class="write-access-banner__image"
    />
    <div class="write-access-banner__text">
      <span class="title">
        {{ $t('profile.withdraw.write_access.title') }}
      </span>
      <span class="description">
        {{ $t('profile.withdraw.write_access.description') }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.write-access-banner {
  @include column;
  @include scroll-gradient(100px);

  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 173px;
  background: linear-gradient(134.09deg, #1477dd 25.4%, #0371e2 92.78%);
  border-radius: 22px;

  &__image {
    align-self: center;
    height: 246px;
    object-fit: cover;
  }

  &__text {
    @include column;

    position: absolute;
    bottom: 0;
    padding: 14px;
    z-index: 2;
  }
}
</style>
