import { createSlice } from '@reduxjs/toolkit'
import { CARD_OPTIONS } from '../../utils/cardOptions'
import { RoomState } from './room.interface'

const initialState: RoomState = {
  isCardsVisible: false,
  actualCards: CARD_OPTIONS[0],
  roomName: undefined,
  isOwner: undefined,
}

export const roomSlice = createSlice({
  name: 'roomState',
  initialState,
  reducers: {
    changeSettings: (state, action) => {
      state.actualCards = action.payload.actualCards
      state.isCardsVisible = action.payload.isCardsVisible
    },
    changeCards: (state, action) => {
      console.log(action.payload, 'changeCards')
      state.actualCards = action.payload
    },
    changeCardVisibility: (state) => {
      state.isCardsVisible = !state.isCardsVisible
    },
    changeRoomName: (state, action) => {
      state.roomName = action.payload
    },
  },
})

export const {
  changeCards,
  changeCardVisibility,
  changeSettings,
  changeRoomName,
} = roomSlice.actions

export default roomSlice.reducer
