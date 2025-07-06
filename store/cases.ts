import type { Case, CaseItem } from '@/types'
import { useUserStore } from '@/store/user'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<Case[]>([])
  const caseItems = ref<CaseItem[]>([])
  const receivedItem = ref<Maybe<CaseItem>>(null)

  const { getUserInfo } = useUserStore()

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
      callback: async result => {
        receivedItem.value = result
        await getUserInfo()
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
