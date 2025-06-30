import type { CaseCard } from '@/components/cases/card.vue'

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<CaseCard[]>([
    {
      id: '1',
      name: 'Water Case-1',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '2',
      name: 'Water Case-2',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '3',
      name: 'Water Case-3',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '4',
      name: 'Water Case-4',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '5',
      name: 'Water Case-5',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '6',
      name: 'Water Case-6',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '7',
      name: 'Water Case-5',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
    {
      id: '8',
      name: 'Water Case-6',
      price: 500,
      image: '/images/cases/main.png',
      tag: {
        text: 'Hot',
        view: 'pink',
      },
    },
  ])

  return {
    cases,
  }
})
