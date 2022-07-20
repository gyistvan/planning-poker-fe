import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Card } from '../../../store/room/room.interface'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  width: 40,
  lineHeight: '60px',
  transition: '0.3s all ease-in',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 0 10px #3f3f3f',
    background: 'rgb(199, 226, 250)',
    position: 'relative',
    top: '-5px',
    transform: 'rotate(-5deg)',
  },
}))

const lightTheme = createTheme({ palette: { mode: 'light' } })

interface IVoteCard {
  card: Card
  sendVote: (cardNum: Card) => void
}

export default function VoteCard(props: IVoteCard) {
  const { card, sendVote } = props
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Box
          sx={{
            bgcolor: 'background.default',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Item elevation={4} onClick={() => sendVote(card)}>
            {card.display}
          </Item>
        </Box>
      </ThemeProvider>
    </>
  )
}
