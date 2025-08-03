<template>
  <div v-if="item" class="withdraw">
    <div class="withdraw__content">
      <item-main-data
        :image="item.image_url"
        :title="snakeToSentence(item.name)"
        :description="
          ('item_type' in item.data && snakeToSentence(item.data.item_type)) ||
          ''
        "
      />
      <ui-divider />
      <profile-timer-card v-if="!isGrowagarden" :item-id="id" />
      <ui-table-data
        v-if="item.game === 'adopt_me'"
        class="case-item__table"
        :list="adoptMeDataListItem"
      >
        <template #row-1>
          <cases-item-abilities
            :flyable="item.data.flyable"
            :rideable="item.data.rideable"
            class="item-case__abilities"
          />
        </template>
      </ui-table-data>
      <ui-table-data
        v-if="item.game === 'mm2'"
        class="case-item__table"
        :list="mm2DataListItem"
      />
      <span v-if="!isGrowagarden" class="description">
        {{ $t('profile.withdraw.description') }}
      </span>
      <span v-if="isGrowagarden" class="description">
        {{ $t('profile.withdraw.growagarden.description') }}
      </span>

      <template v-if="isGrowagarden && !isWriteAccess">
        <write-access-banner />
        <ui-card>
          <span class="description">
            {{ $t('profile.withdraw.write_access.banner') }}
          </span>
        </ui-card>
      </template>
    </div>
    <div class="withdraw__buttons">
      <ui-button-base
        :text="mainButtonText"
        icon-right="foreign"
        size="52"
        @click="onClick"
      />
      <ui-button-base
        v-if="!isGrowagarden"
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
import { snakeToSentence } from '@/utils/snake-to-sentence'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const route = useRoute()
const id = route.params.id as CaseItem['id']

const { item } = storeToRefs(useItemsStore())
const { t } = useI18n()
const { tg } = useTelegram()
const { isGrowagarden } = useCaseGame(item)

const isWriteAccess = computed(() => tg.initDataUnsafe.user?.allows_write_to_pm)

const adoptMeDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value:
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.age'),
    value: item.value?.data && 'age' in item.value.data && item.value?.data.age,
  },
])

const mm2DataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.subtype'),
    value:
      item.value?.data &&
      'item_sub_type' in item.value.data &&
      snakeToSentence(item.value?.data.item_sub_type || ''),
  },
])

const onClick = async () => {
  switch (item.value?.game) {
    case 'adopt_me': {
      tg?.openLink(
        'https://starpets.pw/profile/purchased?utm_source=tg&utm_medium=playly&utm_campaign=withdraw',
      )
      break
    }
    case 'mm2': {
      tg?.openLink(
        'https://starpets.pw/ru/mm2/profile/purchased/?utm_source=tg&utm_medium=playly&utm_campaign=withdraw',
      )
      break
    }
    case 'growagarden': {
      if (await tg.requestWriteAccess()) {
        tg.openTelegramLink('https://t.me/playlygg_bot')
      }
      break
    }
  }
}

const mainButtonText = computed(() => {
  if (isGrowagarden.value) {
    return t('common.go_to_withdraw')
  }

  return t('common.openStarPets')
})

onMounted(async () => {
  if (!item.value) {
    navigateTo('/profile')
  }
})
</script>

<style scoped lang="scss">
.withdraw {
  @include column(18px);

  height: 100%;
  padding: 18px 0;

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
