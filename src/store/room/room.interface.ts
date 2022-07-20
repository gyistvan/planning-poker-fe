export interface RoomSettings {
  isCardsVisible: boolean
  actualCards: SelectedCards
}

export interface SelectedCards {
  cards: Card[]
  name: string
}

export interface Card {
  display: string
  value: number | string
}

export interface RoomState {
  isCardsVisible: boolean
  actualCards: SelectedCards
  roomName: string | undefined
  isOwner: undefined | boolean
}
