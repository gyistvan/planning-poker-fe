export interface AppState {
  socketUrl: string | undefined
  clientName: string | null
  isClientNameSaved: boolean
  isCreateRoomVisible: boolean
  isJoinRoomVisible: boolean
  clientId: string
  isAlertVisible: boolean
  alertMessage: string | undefined
  alertType: string | undefined
  alertTitle: string | undefined
}
