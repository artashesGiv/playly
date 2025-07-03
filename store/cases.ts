import type { Case, CaseItem } from '@/types'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<Case[]>([])
  const caseItems = ref<CaseItem[]>([])
  const receivedItem = ref<Maybe<CaseItem>>(null)

  const getCases = async () => {
    await baseRequest({
      method: () => caseAPI.fetchCases(),
      callback: result => {
        cases.value = result.map(item => ({ ...item, tag: {} }))
      },
    })
  }

  const getCaseItems = async (case_id: string) => {
    await baseRequest({
      method: () => caseAPI.fetchCaseItems({ case_id }),
      callback: result => {
        caseItems.value = result
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
