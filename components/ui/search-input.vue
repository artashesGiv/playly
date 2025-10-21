<template>
  <ui-input-base
    v-model="searchValue"
    v-model:is-error="isError"
    error-message="Минимум 3 символа"
    :placeholder="placeholder"
    icon="search-3"
    class="search"
    @done="onUpdateSearch"
    @update:model-value="onInput($event as string)"
  />
</template>

<script setup lang="ts">
import type { InputBaseProps } from '@/components/ui/input-base.vue'

// types
export type SearchInputProps = {
  search: string
  placeholder?: InputBaseProps['placeholder']
  autoApply?: boolean
}

type Emit = {
  (e: 'update:search', value: string): void
}

// define
const props = defineProps<SearchInputProps>()
const emit = defineEmits<Emit>()

// data
const searchValue = ref('')
const wasChanged = ref(false)
const isError = ref(false)

// methods
const onUpdateSearch = () => {
  if (props.autoApply) return
  if (!wasChanged.value) return

  if (!searchValue.value.length) {
    emit('update:search', searchValue.value)
    return
  }

  if (searchValue.value.length >= 3) {
    emit('update:search', searchValue.value)
    wasChanged.value = false
  } else {
    isError.value = true
  }
}

const onInput = (value: string): void => {
  if (props.autoApply) {
    emit('update:search', value)
  }
}

// watch
watch(searchValue, () => {
  if (!wasChanged.value) {
    wasChanged.value = true
  }
})

watch(
  () => props.search,
  () => {
    searchValue.value = props.search
  },
)
</script>
