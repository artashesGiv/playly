<template>
  <div class="robux-interactive">
    <item-interactive
      @sell="navigateTo('/robux/sell')"
      @withdraw="navigateTo('/robux/withdraw')"
    />
    <ui-divider />
    <ui-table-data :list="dataList">
      <template #row-1>
        <user-data />
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
import UserData from '@/components/user-data.vue'
import { useAuthStore } from '@/store'

const { user } = useTelegram()
const { t } = useI18n()
const { rates } = storeToRefs(useAuthStore())

const dataList = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: user,
  },
  {
    title: `${t('robux.balance.priceFor')} 1 R$`,
    value: rates.value?.robux2crystal,
  },
])
</script>

<style scoped lang="scss">
.robux-interactive {
  @include column(14px);

  &__buttons {
    @include row(10px);
  }

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
