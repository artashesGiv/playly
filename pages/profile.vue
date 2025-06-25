<template>
  <div>
    <h1>{{ tg?.initDataUnsafe.user?.first_name }}</h1>

    <nuxt-img
      class="default__image"
      :src="tg?.initDataUnsafe.user?.photo_url"
    />
    tg: {{ tg?.initDataUnsafe }}

    <ui-icon-base name="login" />

    <ui-divider />

    <ui-title text="Free coins tasks" additional-text="3 avialable" />

    <div class="flex-column">
      <ui-card> <ui-button-base text="Button" size="42" /> </ui-card>
      <ui-card> <ui-button-base text="Button" size="42" /> </ui-card>
      <ui-card> <ui-button-base text="Button" size="42" /> </ui-card>
      <ui-card><ui-button-base text="Button" size="42" /></ui-card>
    </div>

    <div class="flex-column">
      <div class="flex-row">
        <ui-button-base
          text="text"
          size="60"
          icon="login"
          icon-right="down-circle-1"
        />
        <ui-button-base
          text="text"
          view="secondary"
          size="60"
          icon="login"
          icon-right="down-circle-1"
        />
      </div>
      <div class="flex-row">
        <ui-button-base
          text="text"
          size="60"
          icon="login"
          icon-right="down-circle-1"
          is-disabled
        />
        <ui-button-base
          text="text"
          view="secondary"
          size="60"
          icon="login"
          icon-right="down-circle-1"
          is-disabled
        />
      </div>
      <div class="flex-row">
        <ui-button-base size="60" icon="rotate-left" />
        <ui-button-base view="secondary" size="60" icon="rotate-left" />
        <ui-button-base size="44" icon="rotate-left" />
        <ui-button-base view="secondary" size="44" icon="rotate-left" />
        <ui-button-base size="32" icon="rotate-left" />
        <ui-button-base view="secondary" size="32" icon="rotate-left" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
</script>

<style scoped lang="scss">
.flex {
  &-row {
    @include row(10px);
  }

  &-column {
    @include column(10px);
  }
}
</style>
