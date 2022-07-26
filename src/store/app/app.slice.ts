import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import { AppState } from './app.interface'

const env = process.env.NODE_ENV

const getClientId = (): string => {
  let clientId = localStorage.getItem('clientId')
  if (!clientId) {
    clientId = uuid()
    localStorage.setItem('clientId', clientId)
  }
  return clientId
}

const getSocketUrl = (port: number) =>
  env === 'production'
    ? `wss://planning-poker-vyno-be.herokuapp.com`
    : `ws://127.0.0.1:${port}`

const initialState: AppState = {
  socketUrl: undefined,
  clientName: localStorage.getItem('clientName'),
  isClientNameSaved: localStorage.getItem('clientName') !== null,
  isCreateRoomVisible: false,
  isJoinRoomVisible: false,
  clientId: getClientId(),
  isAlertVisible: false,
  alertMessage: undefined,
  alertType: undefined,
  alertTitle: undefined,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    changeSocketUrl: (state, action) => {
      state.socketUrl = getSocketUrl(action.payload)
    },
    changeClientName: (state, action) => {
      state.clientName = action.payload
    },
    saveClientName: (state) => {
      state.isClientNameSaved = true
      if (state.clientName) {
        localStorage.setItem('clientName', state.clientName)
      }
    },
    changeCreateRoomVisibility: (state, action) => {
      state.isCreateRoomVisible = action.payload
    },
    changeJoinRoomVisibility: (state, action) => {
      state.isJoinRoomVisible = action.payload
    },
    showAlert: (state, action) => {
      state.isAlertVisible = true
      state.alertMessage = action.payload.alertMessage
      state.alertType = action.payload.alertType
      state.alertTitle = action.payload.alertTitle
    },
    hideAlert: (state) => {
      state.isAlertVisible = false
      state.alertMessage = undefined
      state.alertType = undefined
      state.alertTitle = undefined
    },
  },
})

export const {
  changeSocketUrl,
  changeClientName,
  saveClientName,
  changeCreateRoomVisibility,
  changeJoinRoomVisibility,
  showAlert,
  hideAlert,
} = appSlice.actions

export default appSlice.reducer

export const useAppSelector = () => useSelector((state: any) => state.app)
