export interface Card {
  id: number
  name: string
  type: 'badge' | 'landscape' | 'portrait'
  rarity: string
  collected: boolean
  duplicates: number
  image?: string
}

export interface CardBlock {
  id: number
  cards: Card[]
}
