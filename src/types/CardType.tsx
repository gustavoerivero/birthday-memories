export type DeckType = {
  id: number
  value: number
  content: string
  flipped: boolean
}[]

export type CardType = {
  id: number
  value: number
  content: string
  flipped: boolean
}

export type ImageCardType = {
  id: number
  image: string
  title: string
  description: string
  flipped: boolean
}

export type ImageDeckType = {
  id: number
  image: string
  title: string
  description: string
  flipped: boolean
}[]

export type ProfileCardType = {
  id: number
  image: string
  title: string
  description: string
}