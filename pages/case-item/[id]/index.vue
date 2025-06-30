<template>
  <div class="case-item">
    <div
      class="case-item__gradient"
      :style="{ background: `var(--${item!.tag.view}-gradient)` }"
    />
    <div class="case-item__content">
      <item-main-data
        :image="item!.image"
        :title="item!.name"
        description="Egg"
      />
      <item-interactive
        :disabled="disableButtons"
        @sell="onSell"
        @withdraw="onWithdraw"
      />
      <ui-divider />
      <ui-table-data :list="dataListOwn">
        <template #row-1>
          <user-data />
        </template>
        <template #row-3="{ value }">
          <div class="case-item__price">
            <span>{{ value }}</span>
            <main-mascot size="xs" />
          </div>
        </template>
      </ui-table-data>
      <ui-table-data class="case-item__table" :list="dataListItem">
        <template #row-1="{ value }">
          <div class="case-item__abilities">
            <cases-item-ability
              v-for="ability in value"
              :key="ability"
              :type="ability"
            />
          </div>
        </template>
      </ui-table-data>
    </div>
    <ui-button-base
      size="52"
      :text="
        isAvailable
          ? $t('common.sellForCoins', item!.price)
          : $t('common.close')
      "
      @click="onClick"
    />
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'
import { useProfileStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { InteractiveProps } from '@/components/item-interactive.vue'
import UserData from '@/components/user-data.vue'

type Status = 'received' | 'available'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const { t } = useI18n()
const { tg } = useTelegram()
const route = useRoute()
const router = useRouter()
const id = route.params.id as CaseItem['id']

const { receivedItems, ownItems } = storeToRefs(useProfileStore())
const item = computed<(CaseItem & { status: Status }) | null>(() => {
  const foundInReceived = receivedItems.value.find(item => item.id === id)
  if (foundInReceived) {
    return { ...foundInReceived, status: 'received' as const }
  }

  const foundInOwn = ownItems.value.find(item => item.id === id)
  if (foundInOwn) {
    return { ...foundInOwn, status: 'available' as const }
  }

  return null
})

const isAvailable = computed(() => item.value!.status === 'available')
const isReceived = computed(() => item.value!.status === 'received')

const disableButtons = computed<InteractiveProps['disabled']>(() =>
  isReceived.value ? ['sell', 'withdraw'] : undefined,
)

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: tg?.initDataUnsafe?.user,
  },
  {
    title: t('common.status'),
    value:
      item.value!.status.charAt(0).toUpperCase() +
      item.value!.status.slice(1).toLowerCase(),
  },
  {
    title: `${t('common.price')}`,
    value: item.value!.price,
  },
])

const dataListItem: TableDataProps['list'] = [
  {
    title: 'Properties',
    value: item?.value?.abilities,
  },
  {
    title: 'Rarity',
    value: item?.value?.tag.text,
  },
  {
    title: 'Age',
    value: 'Post-Teen',
  },
]

const onSell = () => {
  console.log('sell')
}

const onClick = () => {
  if (isAvailable.value) {
    onSell()
  }

  if (isReceived.value) {
    router.back()
  }
}

const onWithdraw = () => {
  navigateTo(`/case-item/${id}/withdraw`)
}
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  height: 100%;

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 226px;
  }

  &__content {
    @include column(18px);

    text-align: center;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__price {
    @include row(8px);
  }

  &__abilities {
    @include row(8px);
  }
}
</style>
