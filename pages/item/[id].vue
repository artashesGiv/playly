<template>
  <transition-fade>
    <div v-if="item && isMounted" class="case-item">
      <div
        class="case-item__gradient"
        :style="{
          background: `var(--${isItem(item) && 'rarity' in item.data ? mapRareColor[item.data?.rarity] : 'yellow'}-gradient)`,
        }"
      />
      <div class="case-item__content">
        <item-main-data
          :image="
            isItem(item) ? item.case_item_image_url : '/images/main/robux.png'
          "
          :title="isItem(item) ? item.item_name : `${item.robux_amount} R$`"
          :description="
            (isItem(item) &&
              'item_type' in item.data &&
              snakeToSentence(item.data.item_type)) ||
            ''
          "
          class="case-item__data"
        />
        <ui-divider />
        <ui-table-data :list="dataListOwn">
          <template #row-1>
            <user-data
              :name="item?.telegram_username"
              :photo_url="item?.telegram_photo_url"
            />
          </template>
          <template #row-3="{ value }">
            <div class="case-item__row">
              <span>{{ formatePrice(value) }}</span>
              <main-mascot size="xs" />
            </div>
          </template>
        </ui-table-data>
        <ui-table-data
          v-if="isItem(item) && item.game === 'adopt_me'"
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
          v-if="isItem(item) && item.game === 'mm2'"
          class="case-item__table"
          :list="mm2DataListItem"
        />
        <ui-table-data
          v-if="isGrowagarden"
          class="case-item__table"
          :list="growagardenDataListItem"
        />
      </div>
      <ui-button-base
        class="case-item__button"
        size="52"
        :text="$t('common.close')"
        @click="onClick"
      />
    </div>
  </transition-fade>
</template>

<script setup lang="ts">
import type { PersonalCaseItem, UserCaseItem, UserRobuxData } from '@/types'
import type { TableDataProps } from '@/components/ui/table-data.vue'
import { useItemsStore } from '@/store'
import { snakeToSentence } from '@/utils/snake-to-sentence'

definePageMeta({
  layout: 'empty',
})
useBackButton()

const item = ref<Maybe<UserCaseItem | UserRobuxData>>(null)

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const id = route.params.id as PersonalCaseItem['id']
const query = route.query as { message_id: string }

const isMounted = ref(false)

const { getItemUser, getRobuxData } = useItemsStore()

const isItem = (item: UserCaseItem | UserRobuxData) => {
  return 'game' in item
}

const { isGrowagarden } = useCaseGame(
  computed(() => (item.value && isItem(item.value) ? item.value : null)),
)

const dataListOwn = computed<TableDataProps['list']>(() => [
  {
    title: t('common.owner'),
    value: '',
  },
  ...(item.value && isItem(item.value) && item.value?.crystal_price
    ? [
        {
          title: `${t('common.price')}`,
          value: item.value?.crystal_price,
        },
      ]
    : []),
])

const adoptMeDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.properties'),
    value: '',
  },
  {
    title: t('common.rarity'),
    value:
      item.value &&
      isItem(item.value) &&
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.age'),
    value:
      item.value &&
      isItem(item.value) &&
      item.value?.data &&
      'age' in item.value.data &&
      snakeToSentence(item.value.data.age || ''),
  },
])

const mm2DataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      item.value &&
      isItem(item.value) &&
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
  {
    title: t('common.subtype'),
    value:
      item.value &&
      isItem(item.value) &&
      item.value?.data &&
      'item_sub_type' in item.value.data &&
      snakeToSentence(item.value?.data.item_sub_type || ''),
  },
])

const growagardenDataListItem = computed<TableDataProps['list']>(() => [
  {
    title: t('common.rarity'),
    value:
      item.value &&
      isItem(item.value) &&
      item.value?.data &&
      'rarity' in item.value.data &&
      t(`rarity.${item.value?.data.rarity}`),
  },
])

const onClick = () => {
  router.back()
}

onMounted(async () => {
  if (id === 'Robux') {
    item.value = await getRobuxData(query.message_id)
  } else {
    item.value = await getItemUser(id)
  }

  isMounted.value = true
})
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  padding: 18px 0;
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

  &__data {
    position: relative;
    z-index: 2;
  }

  &__row {
    @include row(8px);
  }

  &__text {
    text-align: left;
  }

  &__button {
    flex-shrink: 0;
  }
}
</style>
