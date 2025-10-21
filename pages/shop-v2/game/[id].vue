<template>
  <div v-if="currentGame" class="items">
    <transition-height>
      <div v-if="!stepStartScroll" class="items__header-wrapper">
        <back-header
          :title="snakeToSentence(currentGame.name)"
          class="items__header"
          :description="
            $t('market.games.card.count', { n: currentGame.total_items })
          "
        />
      </div>
    </transition-height>

    <shop-v2-step-1
      class="items__content"
      @inner-scroll-start="stepStartScroll = true"
      @inner-scroll-end="stepStartScroll = false"
    />

    <shop-v2-footer class="items__footer" without-continue />
  </div>
</template>
<script lang="ts" setup>
import { useShopV2FlowStore, useShopV2Store } from '@/store'
import type { ShopV2Game } from '@/types'

definePageMeta({
  layout: 'empty',
})

// data
const route = useRoute()
const id = route.params.id as ShopV2Game['id']
const stepStartScroll = ref(false)

// stores
const { gamesPool, games } = storeToRefs(useShopV2Store())
const { marketFlowData } = storeToRefs(useShopV2FlowStore())
const { getGames, getItems, clearItems } = useShopV2Store()

const currentGame = computed(() => gamesPool.value[id])

// hooks
useBackButton()
onMounted(async () => {
  if (!games.value.length) {
    await getGames()
  }

  console.log('ID', id)

  marketFlowData.value.gameId = id
  marketFlowData.value.game = gamesPool.value[id]

  await getItems(id)
})

onBeforeUnmount(async () => {
  clearItems()
})
</script>
<style lang="scss" scoped>
.items {
  @include column;

  padding-top: 16px;
  height: 100%;

  &__header {
    padding-bottom: 14px;

    &-wrapper {
      flex-shrink: 0;
    }
  }

  &__footer {
    margin-top: 16px;
  }
}
</style>
