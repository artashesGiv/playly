<template>
  <div v-if="items.length" class="item">
    <back-header
      :title="snakeToSentence(currentItem.name)"
      class="item__header"
      :description="snakeToSentence(currentItem.data.item_type)"
    />
    <div class="item__content">
      <shop-v2-item-card
        v-bind="currentItem"
        :name="shopItemNameMap[currentItem.name] || currentItem.name"
        size="l"
      />
      <ui-table-data v-if="dataList.length" :list="dataList" />
      <ui-divider />
      <div v-if="dataList.length" class="item__description font-base-medium">
        {{
          $t('market.item.description', {
            game: snakeToSentence(currentItem.category),
            item_type: snakeToSentence(currentItem.data.item_type),
            rarity: snakeToSentence(currentItem.data.rarity),
          })
        }}
      </div>
    </div>
    <shop-v2-footer class="item__footer" />
  </div>
</template>
<script setup lang="ts">
import type { ShopV2Item } from '@/types'
import { useShopV2FlowStore, useShopV2Store } from '@/store'
import { shopItemNameMap } from '@/components/shop-v2/-helpers'
import type { TableDataProps } from '@/components/ui/table-data.vue'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const { t } = useI18n()

const id = route.params.id as ShopV2Item['id']

const { marketFlowData } = storeToRefs(useShopV2FlowStore())
const { itemsPool, items } = storeToRefs(useShopV2Store())
const { getItems } = useShopV2Store()

const currentItem = computed(() => itemsPool.value[id])

const dataList = computed<TableDataProps['list']>(() => [
  ...(currentItem.value.data.item_type
    ? [
        {
          title: t('common.item_type'),
          value: snakeToSentence(currentItem.value.data.item_type),
        },
      ]
    : []),
  ...(currentItem.value.data.rarity
    ? [
        {
          title: t('common.rarity'),
          value: snakeToSentence(currentItem.value.data.rarity),
        },
      ]
    : []),
])

onMounted(async () => {
  if (marketFlowData.value.gameId) {
    await getItems(marketFlowData.value.gameId)

    marketFlowData.value.itemId = id
    marketFlowData.value.item = itemsPool.value[id]
  } else {
    navigateTo('/shop-v2')
  }
})
</script>

<style scoped lang="scss">
.item {
  @include column(16px);

  padding-top: 16px;
  height: 100%;

  &__content {
    @include column(16px);

    flex: 1 1 0;
    overflow: auto;
  }
}
</style>
