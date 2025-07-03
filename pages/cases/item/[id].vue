<template>
  <div class="case-item">
    <div class="case-item__content">
      <div class="case-item__card">
        <div
          class="background"
          :style="{ background: `var(--${receivedItem?.tag.view}-gradient)` }"
        />
        <item-main-data
          :image="receivedItem!.image"
          :title="receivedItem!.name"
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
        :text="$t('cases.roulette.openMore', currentCase?.price)"
        icon-right="coin-1"
        size="52"
        @click="onOpenMore"
      />
      <ui-button-base
        :text="$t('cases.roulette.sellItem', receivedItem!.price)"
        icon-right="coin-1"
        size="52"
        @click="onSellItem(receivedItem!.price)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCasesStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import type { Case } from '@/types'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const route = useRoute()
const router = useRouter()
const { receivedItem, cases } = storeToRefs(useCasesStore())

const id = route.params.id as Case['id']

const currentCase = computed(() => cases.value.find(item => item.id === id))

const dataList: TableDataProps['list'] = [
  {
    title: 'Properties',
    value: receivedItem?.value?.abilities,
  },
  {
    title: 'Rarity',
    value: receivedItem?.value?.tag.text,
  },
  {
    title: 'Age',
    value: 'Post-Teen',
  },
]

const onOpenMore = () => {
  router.back()
}

const onSellItem = (sum: number) => {
  // TODO sell item
  navigateTo('/cases')
}
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  flex-grow: 1;

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
