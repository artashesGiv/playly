<template>
  <div>
    {{ tg?.initData }}
  </div>
</template>

<script lang="ts" setup>
const { tg } = useTelegram()
</script>
