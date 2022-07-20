import {
  configureStore,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import roomReducer from './room/room.slice'
import voteReducer from './vote/vote.slice'
import appReducer from './app/app.slice'

export default configureStore({
  reducer: {
    roomSettings: roomReducer,
    votes: voteReducer,
    app: appReducer,
  },
})
