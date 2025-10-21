<template>
  <div class="contacts">
    <main-logo />
    <span>
      {{ $t('contacts.text') }}
    </span>
    <a href="mailto:support@playly.gg">support@playly.gg</a>
    <a @click="tg.openTelegramLink('https://t.me/playlycare')"> @playlycare </a>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
useBackButton()

const { tg } = useTelegram()
</script>

<style scoped lang="scss">
.contacts {
  @include column(8px);
  font: var(--font-large-medium);
  padding: 18px 0;

  a {
    color: var(--primary-400);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
