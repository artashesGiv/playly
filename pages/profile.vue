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
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
