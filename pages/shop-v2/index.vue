<template>
  <div class="shop">
    <ui-search-input
      v-model:search="gamesSearch"
      auto-apply
      :placeholder="$t('market.games.search.placeholder')"
    />

    <div v-if="!loading" class="shop__content">
      <empty-search-block v-if="isEmpty" @clear="clearGamesParams" />
      <template v-else>
        <div class="shop__section">
          <ui-title :text="$t('market.games.popular')" />
          <div class="shop__popular">
            <div class="shop__popular-track">
              <shop-v2-game-card
                v-for="game in games"
                :key="game.id"
                v-bind="game"
                @click="navigateTo(`/shop-v2/game/${game.id}`)"
              />
            </div>
          </div>
        </div>
        <div class="shop__section">
          <ui-title :text="$t('market.games.all')" :count="games.length" />
          <div class="shop__games">
            <shop-v2-game-card
              v-for="game in games"
              :key="game.id"
              v-bind="game"
              direction="horizontal"
              @click="navigateTo(`/shop-v2/game/${game.id}`)"
            />
          </div>
        </div>
      </template>
    </div>
    <ui-spinner v-else size="xl" class="shop__spinner" />
  </div>
</template>

<script setup lang="ts">
import { useShopV2FlowStore, useShopV2Store } from '@/store'

definePageMeta({
  layout: 'balance',
})

const { gamesSearch, games } = storeToRefs(useShopV2Store())
const { resetMarketFlowData } = useShopV2FlowStore()
const { getGames, clearGamesParams } = useShopV2Store()

const loading = useKeyLoading('get-market-games')

const isEmpty = computed(() => !loading.value && !games.value.length)

onMounted(async () => {
  resetMarketFlowData()
  await getGames()
})
</script>

<style scoped lang="scss">
.shop {
  @include column(16px);

  position: relative;
  height: 100%;

  &__content {
    @include column(16px);

    flex: 1 1 0;
  }

  &__spinner {
    @include center;
  }

  &__popular {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  &__popular-track {
    @include row(12px);

    width: max-content;
  }

  &__games {
    @include column(12px);
  }
}
</style>
