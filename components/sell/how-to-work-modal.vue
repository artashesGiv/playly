<template>
  <ui-modal-base
    :is-open="isOpen"
    class="how-to-work"
    :title="$t('sell.how_to_work_modal.title')"
    @update:is-open="emits('update:isOpen', $event)"
  >
    <div class="how-to-work__content">
      <div class="how-to-work__list">
        <div
          v-for="(item, index) in stepsData"
          :key="index"
          class="card how-to-work__card"
        >
          <ui-tag v-bind="getTagProps(index)" class="card__tag" />
          <div class="card__text">
            <span class="title">
              {{ $t(`sell.how_to_work_modal.step-${index + 1}.title`) }}
            </span>
            <span class="description">
              {{ $t(`sell.how_to_work_modal.step-${index + 1}.description`) }}
            </span>
          </div>
        </div>
      </div>
      <ui-button-base
        :text="$t('sell.how_to_work_modal.button')"
        size="52"
        @click="emits('update:isOpen', false)"
      />
    </div>
  </ui-modal-base>
</template>

<script setup lang="ts">
export type HowToWorkModalProps = {
  isOpen: boolean
}

type Emits = {
  (e: 'update:isOpen', value: boolean): void
}

defineProps<HowToWorkModalProps>()
const emits = defineEmits<Emits>()

const { t } = useI18n()

const stepsData: { title: string; description: string }[] = [
  {
    title: t('sell.how_to_work_modal.step-1.title'),
    description: t('sell.how_to_work_modal.step-1.description'),
  },
  {
    title: t('sell.how_to_work_modal.step-2.title'),
    description: t('sell.how_to_work_modal.step-2.description'),
  },
  {
    title: t('sell.how_to_work_modal.step-3.title'),
    description: t('sell.how_to_work_modal.step-3.description'),
  },
  {
    title: t('sell.how_to_work_modal.step-4.title'),
    description: t('sell.how_to_work_modal.step-4.description'),
  },
]

const getTagProps = (index: number): TagProps => ({
  text:
    index + 1 === 4
      ? t('sell.how_to_work_modal.ready')
      : t('sell.how_to_work_modal.step', index + 1),
  color: index + 1 === 4 ? 'green' : 'blue',
  size: 'l',
})
</script>

<style scoped lang="scss">
.how-to-work {
  &__content {
    @include column(18px);
  }

  &__list {
    @include column(12px);
  }
}

.card {
  @include column(6px);

  border-radius: 16px;
  background: var(--dark-700);
  padding: 12px;

  &__tag {
    width: max-content;
  }

  &__text {
    @include column;
  }
}
</style>
