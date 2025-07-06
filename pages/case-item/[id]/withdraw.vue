<template>
  <div v-if="item" class="withdraw">
    <div class="withdraw__content">
      <item-main-data
        :image="item.image_url"
        :title="item.name"
        :description="item.item_type"
      />
      <ui-divider />
      <profile-timer-card :item-id="id" />
      <ui-table-data class="withdraw__table" :list="dataListItem">
        <template #row-1>
          <div class="withdraw__abilities">
            <cases-item-abilities
              :flyable="item.flyable"
              :rideable="item.rideable"
              class="item-case__abilities"
            />
          </div>
        </template>
      </ui-table-data>
      <span class="description">
        {{ $t('profile.withdraw.description') }}
      </span>
    </div>
    <div class="withdraw__buttons">
      <ui-button-base
        :text="$t('common.openStarPets')"
        icon-right="foreign"
        size="52"
        @click="onClick"
      />
      <ui-button-base
        :text="$t('profile.withdraw.howGetItem')"
        size="52"
        view="secondary"
        icon-right="information-circle"
        @click="navigateTo('/case-item/how-get-item')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import { useItemsStore } from '@/store'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const route = useRoute()
const id = route.params.id as CaseItem['id']

const { item } = storeToRefs(useItemsStore())
const { t } = useI18n()

const dataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value: item.value?.rarity,
  },
  {
    title: t('common.age'),
    value: item.value?.age,
  },
])

const onClick = () => {
  console.log('to star pets')
}
</script>

<style scoped lang="scss">
.withdraw {
  @include column(18px);

  height: 100%;

  &__content {
    @include column(18px);

    flex-grow: 1;
    overflow-y: auto;

    .description {
      font: var(--font-base-medium);
    }
  }

  &__price {
    @include row(8px);
  }

  &__abilities {
    @include row(8px);
  }

  &__buttons {
    @include column(10px);
  }
}
</style>
