<template>
  <div class="robux-interactive">
    <div class="robux-interactive__buttons">
      <ui-button-base
        :text="t('robux.balance.buttons.sell')"
        direction="column"
        view="secondary"
        icon="buy-1"
      />
      <ui-button-base
        :text="t('robux.balance.buttons.withdraw')"
        direction="column"
        view="secondary"
        icon="sp-logo"
      />
      <ui-button-base
        :text="t('robux.balance.buttons.share')"
        direction="column"
        view="secondary"
        icon="send-2"
      />
    </div>
    <ui-divider />
    <ui-card>
      <div class="robux-interactive__card-info">
        <div class="robux-interactive__info-row">
          <span>{{ t('common.owner') }}</span>
          <div class="robux-interactive__user-data">
            <span>
              {{ tg?.initDataUnsafe.user?.first_name }}
              {{ tg?.initDataUnsafe.user?.last_name }}
            </span>
            <nuxt-img
              class="robux-interactive__avatar"
              :src="tg?.initDataUnsafe.user?.photo_url"
            />
          </div>
        </div>
        <ui-divider view="light" />
        <div class="robux-interactive__info-row">
          <span>{{ t('robux.balance.priceFor') }} 1 R$</span>
          <div class="robux-interactive__price">
            <span>18</span>
            <main-mascot size="xs" />
          </div>
        </div>
      </div>
    </ui-card>
    <ui-divider />
  </div>
</template>

<script setup lang="ts">
const { tg } = useTelegram()
const { t } = useI18n()
</script>

<style scoped lang="scss">
.robux-interactive {
  @include column(14px);

  &__buttons {
    @include row(10px);
  }

  &__card-info {
    @include column(14px);
  }

  &__info-row {
    @include row(12px);

    justify-content: space-between;

    span {
      font: var(--font-base-medium);
      color: var(--white);
    }
  }

  &__user-data,
  &__price {
    @include row(8px);

    span {
      color: var(--light-500);
    }
  }

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
