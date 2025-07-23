<template>
  <bounty-card
    :sum="settings.channel_join_crystal_amount"
    :text="$t('coins.tasks.playlyTg')"
  />
</template>

<script setup lang="ts">
import { useCoinsStore } from '@/store'

const { settings } = storeToRefs(useCoinsStore())
</script>

<style scoped lang="scss"></style>
