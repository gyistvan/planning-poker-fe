import { createSlice } from '@reduxjs/toolkit'

export const voteSlice = createSlice({
  name: 'voteState',
  initialState: { votes: {} },
  reducers: {
    changeVotes: (state, action) => {
      state.votes = { ...action.payload }
    },
  },
})

export const { changeVotes } = voteSlice.actions

export default voteSlice.reducer
