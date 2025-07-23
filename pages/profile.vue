<template>
  <div class="profile">
    <profile-main />
    <star-pets-link-card />
    <language />
    <ui-divider />
    <profile-community />
    <ui-divider />
    <profile-items-list type="in_withdraw_progress" />
    <ui-divider />
    <profile-items-list type="own" />
    <ui-divider />
    <profile-items-list type="withdraw_success" />
    <ui-divider />
    <profile-items-list type="sold" />
    <ui-divider />
    <agreement />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.profile {
  @include column(18px);
}
</style>
