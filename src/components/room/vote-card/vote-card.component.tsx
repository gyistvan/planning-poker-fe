import React from 'react'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Card } from '../../../store/room/room.interface'
import { useRoomSelector } from '../../../store/room/room.slice'
import { voteCard } from './vote-card-style'

interface IVoteCard {
  card: Card
  sendVote: (cardNum: Card) => void
}

export default function VoteCard(props: IVoteCard) {
  const { card, sendVote } = props
  const { isCardsVisible } = useRoomSelector()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={4}
          onClick={() => !isCardsVisible && sendVote(card)}
          sx={voteCard(isCardsVisible)}
        >
          {card.display}
        </Paper>
      </Box>
    </>
  )
}
