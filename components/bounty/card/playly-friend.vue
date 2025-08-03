<template>
  <bounty-card
    :sum="settings.ref_crystal_amount"
    :text="$t('coins.tasks.inviteFriend')"
    is-invite
  />
</template>

<script setup lang="ts">
import { useCoinsStore } from '@/store'

const { settings } = storeToRefs(useCoinsStore())
</script>

<style scoped lang="scss"></style>
