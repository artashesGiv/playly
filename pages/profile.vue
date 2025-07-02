<template>
  <div class="profile">
    <profile-main />
    <star-pets-link-card />
    <language />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-items-list type="own" />
    <ui-divider />
    <profile-items-list type="received" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
