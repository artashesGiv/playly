import type { CaseItem } from '@/types'

export const useProfileStore = defineStore('profile', () => {
  const ownItems = ref<CaseItem[]>([
    {
      id: '1',
      price: 520,
      name: 'Golden Dragon',
      image: '/images/template/case-item.png',
      probability: 0.5,
      tag: { text: 'Legendary', view: 'pink' },
      abilities: ['mega-neon', 'fly', 'ride'],
    },
    {
      id: '2',
      price: 521,
      name: 'Shadow Wolf',
      image: '/images/template/case-item.png',
      probability: 1.2,
      tag: { text: 'Ultra Rare', view: 'red' },
      abilities: ['neon', 'fly'],
    },
    {
      id: '3',
      price: 522,
      name: 'Frost Unicorn',
      image: '/images/template/case-item.png',
      probability: 0.9,
      tag: { text: 'Legendary', view: 'blue' },
      abilities: ['mega-neon', 'fly', 'neon'],
    },
    {
      id: '4',
      price: 525,
      name: 'Flame Tiger',
      image: '/images/template/case-item.png',
      probability: 2.5,
      tag: { text: 'Rare', view: 'yellow' },
      abilities: ['ride'],
    },
    {
      id: '5',
      price: 520,
      name: 'Crystal Penguin',
      image: '/images/template/case-item.png',
      probability: 3.8,
      tag: { text: 'Uncommon', view: 'pink' },
      abilities: ['neon'],
    },
  ])
  const receivedItems = ref<CaseItem[]>([
    {
      id: '7',
      price: 520,
      name: 'Golden Dragon',
      image: '/images/template/case-item.png',
      probability: 0.5,
      tag: { text: 'Legendary', view: 'pink' },
      abilities: ['mega-neon', 'fly', 'ride'],
    },
    {
      id: '8',
      price: 520,
      name: 'Shadow Wolf',
      image: '/images/template/case-item.png',
      probability: 1.2,
      tag: { text: 'Ultra Rare', view: 'red' },
      abilities: ['neon', 'fly'],
    },
  ])

  return {
    ownItems,
    receivedItems,
  }
})
