export interface AppState {
  socketUrl: string | undefined
  clientName: string | null
  isClientNameSaved: boolean
  isCreateRoomVisible: boolean
  isJoinRoomVisible: boolean
  clientId: string
}
