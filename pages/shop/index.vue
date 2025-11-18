<template>
  <div class="shop">
    <ui-input-base
      v-model="search"
      icon="search-3"
      :placeholder="$t('shop.search.placeholder')"
    />
    <shop-robux-banner />
    <ui-tabs v-model="currentTab" :list="tabs" />
    <ui-divider />
    <div class="shop__list">
      <shop-item-card
        v-for="item in items"
        :key="item.id"
        v-bind="item"
        :name="shopItemNameMap[item.name] || item.name"
        @click="onBuy(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShopStore } from '@/store'
import type { ShopItem } from '@/types'
import type { TabsProps } from '@/components/ui/tabs.vue'
import { shopItemNameMap } from './-helpers'

const { tg } = useTelegram()

const { search, items, currentTab } = storeToRefs(useShopStore())
const { getItems } = useShopStore()

const router = useRouter()

const categoryList: ShopItem['category'][] = [
  'growagarden',
  // 'brawl_stars',
  // 'pubg_mobile',
  // 'fortnite',
  // 'standoff2',
  // 'clash_of_clans',
  // 'call_of_duty',
  // 'free_fire',
  // 'mobile_legends',
  // 'clash_royale',
  // 'minecraft',
]

const tabs: TabsProps<ShopItem['category'] | 'all'>['list'] = [
  ...categoryList.map(item => ({
    id: item,
    text: snakeToSentence(item),
  })),
]

const onBuy = async (item: ShopItem) => {
  if (await tg.requestWriteAccess()) {
    await router.push({
      path: '/shop/pay',
      query: {
        item: JSON.stringify(item),
      },
    })
  }
}

onMounted(async () => {
  await getItems()
})
</script>

<style scoped lang="scss">
.shop {
  @include column(16px);

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}
</style>
