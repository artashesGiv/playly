<template>
  <cases-roulette
    :id="id"
    :case-items="caseItems"
    :current-case="currentCase"
    class="roulette"
  />
</template>

<script setup lang="ts">
import type { Case } from '@/types'
import { useCasesStore } from '@/store'

definePageMeta({ layout: 'without-padding' })

const route = useRoute()
const id = route.params.id as Case['id']

const { caseItems, cases } = storeToRefs(useCasesStore())

const currentCase = computed<Case>(
  () => cases.value.find(item => item.id === id)!,
)
</script>
