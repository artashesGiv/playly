<template>
  <div class="failed">
    <ui-title text="Произошла ошибка платежа" />
    <ui-button-base text="Назад в приложение" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})

const { tg } = useTelegram()

const onClick = () => {
  tg?.openLink(
    linkEncode('playlygg_bot', {
      route: '/robux/buy?step=5&error=true',
    }),
  )
}
</script>

<style scoped lang="scss">
.failed {
  padding: 18px 0;
}
</style>
