import type { Case, CaseItem, Cases } from '@/types'
import { useUserStore } from '@/store/user'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<Case[]>([])
  const casesOnboarding = ref<Case[]>([])
  const caseItems = ref<CaseItem[]>([])
  const receivedItem = ref<Maybe<CaseItem>>(null)
  const musicUrl = ref('')
  const currentTab = ref('all')

  const { getUserInfo } = useUserStore()
  const sortableCases = computed<Case[]>(() =>
    [...cases.value].sort((a, b) => a.price - b.price),
  )

  const getCases = async (params?: Cases.GET.Cases.Params) => {
    await baseRequest({
      method: () => caseAPI.fetchCases(params),
      callback: result => {
        cases.value = result.map(item => ({ ...item, tag: {} }))
      },
    })
  }

  const getCaseItems = async (case_id: string, isRobux?: boolean) => {
    await baseRequest({
      method: isRobux
        ? () => caseAPI.fetchRobuxCaseItems({ case_id })
        : () => caseAPI.fetchCaseItems({ case_id }),
      callback: result => {
        caseItems.value = result.list_items
        musicUrl.value = result.music_url
      },
    })
  }

  const openCase = async (case_id: string, isRobux?: boolean) => {
    try {
      return await baseRequest({
        method: isRobux
          ? () => caseAPI.openRobuxCase({ case_id })
          : () => caseAPI.openCase({ case_id }),
        callback: async result => {
          receivedItem.value = result
          await getUserInfo()
        },
      })
    } catch {
      return null
    }
  }

  const fetchCasesOnboarding = async () => {
    await baseRequest({
      method: () => caseAPI.fetchCasesOnboarding(),
      callback: result => {
        casesOnboarding.value = result
      },
    })
  }

  return {
    cases,
    caseItems,
    sortableCases,
    receivedItem,
    musicUrl,
    currentTab,
    casesOnboarding,
    openCase,
    getCases,
    getCaseItems,
    fetchCasesOnboarding,
  }
})
