import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Card, CardBlock } from '@/types/card'

export const useCardsStore = defineStore('cards', () => {
  // State
  const blocks = ref<CardBlock[]>([
    // {
    //   id: 1,
    //   cards: [
    //     {
    //       id: 1,
    //       name: 'Mickey Mouse',
    //       type: 'badge',
    //       rarity: 'Legendary',
    //       collected: true,
    //       duplicates: 2,
    //       image: '/images/Disney_Mickey_Mouse.webp',
    //     },
    //     {
    //       id: 2,
    //       name: 'Disney Castle',
    //       type: 'landscape',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 3,
    //       name: 'Donald Duck',
    //       type: 'portrait',
    //       rarity: 'Rare',
    //       collected: false,
    //       duplicates: 0,
    //     },
    //     {
    //       id: 4,
    //       name: 'Goofy',
    //       type: 'portrait',
    //       rarity: 'Rare',
    //       collected: true,
    //       duplicates: 3,
    //     },
    //     {
    //       id: 519,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 518,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 517,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 516,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 515,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 514,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 513,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 512,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 511,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 510,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 59,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 58,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 57,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 56,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 55,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 54,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 53,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 52,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 51,
    //       name: 'Minnie Mouse',
    //       type: 'portrait',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   cards: [
    //     {
    //       id: 6,
    //       name: 'Pluto',
    //       type: 'badge',
    //       rarity: 'Legendary',
    //       collected: false,
    //       duplicates: 0,
    //     },
    //     {
    //       id: 7,
    //       name: 'Main Street USA',
    //       type: 'landscape',
    //       rarity: 'Epic',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 8,
    //       name: 'Daisy Duck',
    //       type: 'portrait',
    //       rarity: 'Rare',
    //       collected: true,
    //       duplicates: 1,
    //     },
    //     {
    //       id: 9,
    //       name: 'Chip',
    //       type: 'portrait',
    //       rarity: 'Common',
    //       collected: false,
    //       duplicates: 0,
    //     },
    //     {
    //       id: 10,
    //       name: 'Dale',
    //       type: 'portrait',
    //       rarity: 'Common',
    //       collected: false,
    //       duplicates: 0,
    //     },
    //   ],
    // },
    {
      id: 3,
      cards: [
        {
          id: 11,
          name: 'Vault-Tec Logo',
          type: 'badge',
          rarity: 'Legendary',
          collected: true,
          duplicates: 1,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 03_43_23 PM.png',
        },
        {
          id: 12,
          name: 'Wasteland Vista',
          type: 'landscape',
          rarity: 'Epic',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/landscape.png',
        },
        {
          id: 13,
          name: 'Vault Dweller',
          type: 'portrait',
          rarity: 'Rare',
          collected: true,
          duplicates: 2,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_03_37 PM.png',
        },
        {
          id: 14,
          name: 'Power Armour Soldier',
          type: 'portrait',
          rarity: 'Epic',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_12_10 PM.png',
        },
        {
          id: 14,
          name: 'Wasteland Private Eye',
          type: 'portrait',
          rarity: 'Epic',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_44_41 PM.png',
        },
        {
          id: 15,
          name: 'Brotherhood Paladin',
          type: 'portrait',
          rarity: 'Rare',
          collected: true,
          duplicates: 1,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_13_58 PM.png',
        },
        {
          id: 16,
          name: 'Wasteland Wanderer',
          type: 'portrait',
          rarity: 'Rare',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_15_46 PM.png',
        },
        {
          id: 17,
          name: 'NCR Ranger',
          type: 'portrait',
          rarity: 'Epic',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_18_37 PM.png',
        },
        {
          id: 18,
          name: 'Vault Engineer',
          type: 'portrait',
          rarity: 'Common',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_20_22 PM.png',
        },
        {
          id: 19,
          name: 'Wasteland Scavenger',
          type: 'portrait',
          rarity: 'Common',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_29_41 PM.png',
        },
        {
          id: 20,
          name: 'Settler',
          type: 'portrait',
          rarity: 'Common',
          collected: true,
          duplicates: 0,
          image: '/images/fallout/ChatGPT Image Jan 6, 2026, 02_34_01 PM.png',
        },
      ],
    },
  ])

  // Getters
  const allCards = computed(() => blocks.value.flatMap((b) => b.cards))

  const stats = computed(() => ({
    collected: allCards.value.filter((c) => c.collected).length,
    missing: allCards.value.filter((c) => !c.collected).length,
    duplicates: allCards.value.reduce((sum, c) => sum + Math.max(0, c.duplicates - 1), 0),
  }))

  const getCardById = computed(() => (id: number) => {
    return allCards.value.find((card) => card.id === id)
  })

  // Actions
  const toggleCardCollected = (cardId: number) => {
    const card = getCardById.value(cardId)
    if (card) {
      card.collected = !card.collected
      if (!card.collected) {
        card.duplicates = 0
      }
    }
  }

  const incrementDuplicates = (cardId: number) => {
    const card = getCardById.value(cardId)
    if (card && card.collected) {
      card.duplicates++
    }
  }

  const decrementDuplicates = (cardId: number) => {
    const card = getCardById.value(cardId)
    if (card && card.duplicates > 1) {
      card.duplicates--
    }
  }

  const setBlocks = (newBlocks: CardBlock[]) => {
    blocks.value = newBlocks
  }

  const fetchBlocks = async () => {
    // TODO: Replace with actual API call
    // For now, using the initial sample data
    // Example:
    // const response = await fetch('/api/blocks')
    // const data = await response.json()
    // blocks.value = data
    return Promise.resolve(blocks.value)
  }

  return {
    // State
    blocks,

    // Getters
    allCards,
    stats,
    getCardById,

    // Actions
    toggleCardCollected,
    incrementDuplicates,
    decrementDuplicates,
    setBlocks,
    fetchBlocks,
  }
})
