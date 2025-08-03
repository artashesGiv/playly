<template>
  <div class="success">
    <ui-title text="Все прошло успешно" />
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
      route: '/robux/buy?step=6',
    }),
  )
}
</script>

<style scoped lang="scss">
.success {
  padding: 18px 0;
}
</style>
