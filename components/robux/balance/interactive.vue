<template>
  <div class="robux-interactive">
    <div class="robux-interactive__buttons">
      <ui-button-base
        :text="$t('robux.balance.buttons.sell')"
        direction="column"
        view="secondary"
        icon="buy-1"
      />
      <ui-button-base
        :text="$t('robux.balance.buttons.withdraw')"
        direction="column"
        view="secondary"
        icon="sp-logo"
      />
      <ui-button-base
        :text="$t('robux.balance.buttons.share')"
        direction="column"
        view="secondary"
        icon="send-2"
      />
    </div>
    <ui-divider />
    <ui-table-data :list="dataList">
      <template #row-1="{ value }">
        <div class="robux-interactive__user-data">
          <span>
            {{ value.first_name }}
            {{ value.last_name }}
          </span>
          <nuxt-img class="robux-interactive__avatar" :src="value.photo_url" />
        </div>
      </template>
      <template #row-2="{ value }">
        <div class="robux-interactive__price">
          <span>{{ value }}</span>
          <main-mascot size="xs" />
        </div>
      </template>
    </ui-table-data>
    <ui-divider />
  </div>
</template>

<script setup lang="ts">
import type { TableDataProps } from '@/components/ui/table-data.vue'

const { tg } = useTelegram()
const { t } = useI18n()

const dataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: tg?.initDataUnsafe.user,
  },
  {
    title: `${t('robux.balance.priceFor')} 1 R$`,
    value: 18,
  },
])
</script>

<style scoped lang="scss">
.robux-interactive {
  @include column(14px);

  &__buttons {
    @include row(10px);
  }

  &__user-data,
  &__price {
    @include row(8px);
  }

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
