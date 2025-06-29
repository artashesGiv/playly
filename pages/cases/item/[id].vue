<template>
  <div class="case-item">
    <div class="case-item__content">
      <div class="case-item__card">
        <div
          class="background"
          :style="{ background: `var(--${item?.tag.view}-gradient)` }"
        />
        <nuxt-img class="case-item__image" :src="item?.image" />
        <h4 class="title">{{ item?.name }}</h4>
        <span>Egg</span>
        <ui-card class="case-item__table">
          <div class="case-item__data-cell">
            <span> Properties </span>
            <div class="case-item__abilities">
              <cases-item-ability
                v-for="ability in item?.abilities"
                :key="ability"
                :type="ability"
              />
            </div>
          </div>
          <ui-divider view="light" />
          <div class="case-item__data-cell">
            <span> Rarity </span>
            <span> {{ item?.tag.text }} </span>
          </div>
          <ui-divider view="light" />
          <div class="case-item__data-cell">
            <span> Age </span>
            <span> Post-Teen </span>
          </div>
        </ui-card>
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
        :text="$t('cases.roulette.sellItem', 342)"
        icon-right="coin-1"
        size="52"
        @click="navigateTo('/profile')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '@/types'
import { useBalanceStore, useRouletteSore } from '@/store'

definePageMeta({
  layout: 'empty',
})
const route = useRoute()
const router = useRouter()
useBackButton()
const { caseItems } = storeToRefs(useRouletteSore())
const { balance } = storeToRefs(useBalanceStore())

const id = route.params.id as CaseItem['id']

const item = computed(() => caseItems.value.find(item => item.id === id))

const onOpenMore = () => {
  if (balance.value >= 500) {
    router.back()
  }
}
</script>

<style scoped lang="scss">
.case-item {
  @include column(18px);

  padding-top: 77px;
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
    @include column(14px);

    align-self: stretch;
    margin-top: 33px;
  }

  &__data-cell {
    @include row(12px);

    justify-content: space-between;

    span {
      font: var(--font-base-medium);
    }

    span:first-child {
      color: var(--white);
    }
  }

  &__description {
    font: var(--font-base-medium);
  }

  &__buttons {
    @include column(12px);
  }
}
</style>
