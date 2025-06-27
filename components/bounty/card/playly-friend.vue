<template>
  <bounty-card :sum="200" :text="t('coins.tasks.inviteFriend')" is-invite />
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss"></style>
