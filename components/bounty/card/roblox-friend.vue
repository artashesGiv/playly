<template>
  <bounty-card
    :sum="settings.ref_crystal_amount"
    :text="$t('coins.tasks.inviteFriendFromRoblox')"
    is-invite
  />
</template>

<script setup lang="ts">
import { useCoinsStore } from '@/store'

const { settings } = storeToRefs(useCoinsStore())
</script>

<style scoped lang="scss"></style>
