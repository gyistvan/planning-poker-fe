import { createSlice } from '@reduxjs/toolkit'
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
    ? `wss://planning-poker-vyno-be.herokuapp.com:${port}`
    : `ws://127.0.0.1:${port}`

const initialState: AppState = {
  socketUrl: undefined,
  clientName: localStorage.getItem('clientName'),
  isClientNameSaved: localStorage.getItem('clientName') !== null,
  isCreateRoomVisible: false,
  isJoinRoomVisible: false,
  clientId: getClientId(),
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
  },
})

export const {
  changeSocketUrl,
  changeClientName,
  saveClientName,
  changeCreateRoomVisibility,
  changeJoinRoomVisibility,
} = appSlice.actions

export default appSlice.reducer
