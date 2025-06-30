<template>
  <div class="withdraw">
    <div class="withdraw__content">
      <item-main-data
        :image="item!.image"
        :title="item!.name"
        description="Egg"
      />
      <ui-divider />
      <profile-timer-card :item-id="id" />
      <ui-table-data class="withdraw__table" :list="dataListItem">
        <template #row-1="{ value }">
          <div class="withdraw__abilities">
            <cases-item-ability
              v-for="ability in value"
              :key="ability"
              :type="ability"
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
import { useProfileStore } from '@/store'
import type { TableDataProps } from '@/components/ui/table-data.vue'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const route = useRoute()
const id = route.params.id as CaseItem['id']

const { receivedItems, ownItems } = storeToRefs(useProfileStore())
const item = computed(() =>
  [...receivedItems.value, ...ownItems.value].find(item => item.id === id),
)

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
