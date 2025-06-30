<template>
  <div class="case-item">
    <div class="case-item__content">
      <div class="case-item__card">
        <div
          class="background"
          :style="{ background: `var(--${item?.tag.view}-gradient)` }"
        />
        <item-main-data
          :image="item!.image"
          :title="item!.name"
          description="Egg"
        />
        <ui-table-data class="case-item__table" :list="dataList">
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
      <span class="case-item__description">
        {{ $t('cases.roulette.canSell') }}
      </span>
    </div>
    <div class="case-item__buttons">
      <ui-button-base
        view="secondary"
        :text="$t('cases.roulette.openMore', 500)"
        icon-right="coin-1"
        size="52"
        @click="onOpenMore"
      />
      <ui-button-base
        :text="$t('cases.roulette.sellItem', item!.price)"
        icon-right="coin-1"
        size="52"
        @click="onSellItem(item!.price)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'
import { useBalanceStore, useRouletteSore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'

definePageMeta({
  layout: 'empty',
})
const route = useRoute()
const router = useRouter()
useBackButton()
const { caseItems } = storeToRefs(useRouletteSore())
const balanceStore = useBalanceStore()
const { balance } = storeToRefs(balanceStore)

const id = route.params.id as CaseItem['id']

const item = computed(() => caseItems.value.find(item => item.id === id))

const dataList: TableDataProps['list'] = [
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

const onOpenMore = () => {
  // if (balance.value >= 500) {
  router.back()
  // }
}

const onSellItem = (sum: number) => {
  navigateTo('/profile')
  balanceStore.addBalance(sum)
}
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  height: 100%;

  &__content {
    @include column(14px);

    flex-grow: 1;
  }

  &__card {
    @include column;

    position: relative;
    align-items: center;
    text-align: center;
    border-radius: 22px;
    padding: 12px;
    overflow: hidden;
    background-color: var(--dark-900);

    & > h4 {
      margin-top: 18px;
    }
    & > span {
      font: var(--font-base-medium);
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 168px;
    }
  }

  &__abilities {
    @include row(8px);
  }

  &__image {
    width: 134px;
    height: 134px;
  }

  &__table {
    margin-top: 33px;
  }

  &__description {
    font: var(--font-base-medium);
  }

  &__buttons {
    @include column(12px);
  }
}
</style>
