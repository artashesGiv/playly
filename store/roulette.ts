import type { CaseItem } from '@/types'

export const useRouletteSore = defineStore('roulette', () => {
  const caseItems = ref<CaseItem[]>([
    {
      id: '1',
      name: 'Golden Dragon',
      image: '/images/template/case-item.png',
      probability: 0.5,
      tag: { text: 'Legendary', view: 'pink' },
      abilities: ['mega-neon', 'fly', 'ride'],
    },
    {
      id: '2',
      name: 'Shadow Wolf',
      image: '/images/template/case-item.png',
      probability: 1.2,
      tag: { text: 'Ultra Rare', view: 'red' },
      abilities: ['neon', 'fly'],
    },
    {
      id: '3',
      name: 'Frost Unicorn',
      image: '/images/template/case-item.png',
      probability: 0.9,
      tag: { text: 'Legendary', view: 'blue' },
      abilities: ['mega-neon', 'fly', 'neon'],
    },
    {
      id: '4',
      name: 'Flame Tiger',
      image: '/images/template/case-item.png',
      probability: 2.5,
      tag: { text: 'Rare', view: 'yellow' },
      abilities: ['ride'],
    },
    {
      id: '5',
      name: 'Crystal Penguin',
      image: '/images/template/case-item.png',
      probability: 3.8,
      tag: { text: 'Uncommon', view: 'pink' },
      abilities: ['neon'],
    },
  ])

  return {
    caseItems,
  }
})
