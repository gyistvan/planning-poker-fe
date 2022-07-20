import React, { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import useWebSocket from 'react-use-websocket'
import { Card, RoomSettings } from '../../../store/room/room.interface'
import RoomOptions from '../RoomOptions/RoomOptions'
import VoteCard from '../voteCard/VoteCard'
import { useDispatch, useSelector } from 'react-redux'
import { changeSettings } from '../../../store/room/room.slice'
import { changeVotes } from '../../../store/vote/vote.slice'
import { UserList } from '../UserList/UserList'

export default function ActualRoom() {
  const { votes } = useSelector((state: any) => state.votes)
  const { socketUrl, clientId } = useSelector((state: any) => state.app)
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
  })
  const roomSettings = useSelector((state: any) => state.roomSettings)
  const dispatch = useDispatch()

  useEffect(() => {
    if (lastMessage !== null) {
      let parsedData = JSON.parse(lastMessage.data)
      console.log(parsedData, 'parsedData')
      if (parsedData.state) {
        console.log(parsedData.state)
        dispatch(changeVotes(parsedData.state))
      }
      if (parsedData.settings) {
        console.log(parsedData.settings)
        dispatch(changeSettings(parsedData.settings))
      }
    }
  }, [lastMessage])

  const sendVote = (vote: Card) => {
    sendMessage(JSON.stringify({ vote, clientId }))
  }

  return (
    <>
      <Box
        sx={{
          m: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <>
          {roomSettings && roomSettings.actualCards && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
                margin: '10px 30%',
              }}
            >
              <Typography variant="h5">
                Cards: {roomSettings.actualCards.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {roomSettings.actualCards &&
                  roomSettings.actualCards.cards.map((card: any) => (
                    <VoteCard
                      key={card.display}
                      card={card}
                      sendVote={sendVote}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 2,
          width: '30ch',
        }}
      >
        {votes[clientId] && (
          <UserList isOwner={votes[clientId].owner} sendMessage={sendMessage} />
        )}
      </Box>
    </>
  )
}
