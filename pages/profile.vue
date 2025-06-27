<template>
  <div class="profile">
    <profile-main />
    <star-pets-link />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-your-items />
    <ui-divider />
    <profile-received-items />
    <ui-button-base
      v-for="l in locales"
      :key="l.code"
      :view="l.code === locale ? 'primary' : 'secondary'"
      :text="l.name"
      @click="setLocale(l.code)"
    />
  </div>
</template>

<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()
</script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
