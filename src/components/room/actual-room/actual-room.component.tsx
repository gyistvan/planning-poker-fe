import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import useWebSocket from 'react-use-websocket'
import { Card } from '../../../store/room/room.interface'
import VoteCard from '../vote-card/vote-card.component'
import { useDispatch, useSelector } from 'react-redux'
import { changeSettings } from '../../../store/room/room.slice'
import { changeVotes } from '../../../store/vote/vote.slice'
import { UserList } from '../user-list/user-list.component'
import { showAlert, useAppSelector } from '../../../store/app/app.slice'
import { createAlertObj } from '../../../utils/create-alert-obj'
import { cards, cardsWrapper, users, wrapper } from './actual-room.style'

export default function ActualRoom() {
  const { votes } = useSelector((state: any) => state.votes)
  const { socketUrl, clientId } = useAppSelector()
  const { roomName } = useSelector((state: any) => state.roomSettings)
  const roomSettings = useSelector((state: any) => state.roomSettings)
  const { sendMessage, lastMessage } = useWebSocket(
    `${socketUrl}/${roomName}`,
    {
      onOpen: () => console.log('opened'),
    }
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (lastMessage !== null) {
      let parsedData = JSON.parse(lastMessage.data)
      console.log(parsedData, 'parsedData')
      if (parsedData.cardsRevealed) {
        dispatch(showAlert(createAlertObj(undefined, 'Cards revealed', 'info')))
      }
      if (parsedData.state) {
        dispatch(changeVotes(parsedData.state))
      }
      if (parsedData.settings) {
        dispatch(changeSettings(parsedData.settings))
      }
      if (
        parsedData.newClientConnected &&
        parsedData.newClientConnected.clientId !== clientId
      ) {
        dispatch(
          showAlert(
            createAlertObj(
              'New player',
              `new player joined to the room with name: ${parsedData.newClientConnected.clientName}`,
              'info'
            )
          )
        )
      }
    }
  }, [lastMessage])

  const sendVote = (vote: Card) => {
    sendMessage(JSON.stringify({ vote, clientId }))
    dispatch(
      showAlert(
        createAlertObj(undefined, `Selected vote: ${vote.display}`, 'info')
      )
    )
  }

  return (
    <>
      <Box sx={wrapper}>
        <>
          {roomSettings && roomSettings.actualCards && (
            <Box sx={cardsWrapper}>
              <Typography variant="h5">
                Cards: {roomSettings.actualCards.name}
              </Typography>
              <Box sx={cards}>
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
      <Box sx={users}>
        {votes[clientId] && (
          <UserList isOwner={votes[clientId].owner} sendMessage={sendMessage} />
        )}
      </Box>
    </>
  )
}
