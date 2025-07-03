import type { CaseCard } from '@/components/cases/card.vue'
import type { CaseItem } from '@/types'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<CaseCard[]>([])
  const caseItems = ref<CaseItem[]>([])
  const receivedItem = ref<Maybe<CaseItem>>(null)

  const getCases = async () => {
    await baseRequest({
      method: () => caseAPI.fetchCases(),
      callback: result => {
        cases.value = result
      },
    })
  }

  const getCaseItems = async (case_id: string) => {
    await baseRequest({
      method: () => caseAPI.fetchCaseItems({ case_id }),
      callback: result => {
        cases.value = result
      },
    })
  }

  const openCase = async (case_id: string) => {
    await baseRequest({
      method: () => caseAPI.openCase({ case_id }),
      callback: result => {
        receivedItem.value = result
      },
    })
  }

  return {
    cases,
    caseItems,
    receivedItem,
    openCase,
    getCases,
    getCaseItems,
  }
})
