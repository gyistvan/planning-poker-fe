import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../../../store/room/room.interface'
import { CARD_OPTIONS } from '../../../utils/card-options.constant'
import RoomOptions from '../room-options/room-options.component'
import UserCard from '../user-card/user-card.component'

export interface IUserList {
  sendMessage: Function
  isOwner: boolean
}

export const UserList: React.FC<IUserList> = ({ sendMessage, isOwner }) => {
  const roomSettings = useSelector((state: any) => state.roomSettings)
  const { votes } = useSelector((state: any) => state.votes)
  const { clientId } = useSelector((state: any) => state.app)

  const getStayCount = () =>
    Object.keys(votes).reduce(
      (total, id) => (total += votes[id].vote.value === '?' ? 1 : 0),
      0
    )

  const isTShirtCards = () =>
    roomSettings && roomSettings.actualCards.name === 'T-Shirts'

  const getTotalVotes = () =>
    Object.keys(votes).reduce(
      (total, id) =>
        (total += isNaN(parseInt(votes[id].vote.value))
          ? 0
          : parseInt(votes[id].vote.value)),
      0
    )

  const getAverageVotes = () =>
    getTotalVotes() / (getTotalUsers() - getStayCount())

  const getTShirtVotesValue = () => {
    return CARD_OPTIONS[2].cards.find(
      (card: Card) => card.value === Math.round(getAverageVotes())
    )!.display
  }

  const getFinalVote = () => {
    console.log('roomSettings.isCardVisible', roomSettings.isCardsVisible)
    if (roomSettings && roomSettings.isCardsVisible) {
      console.log(
        getAverageVotes(),
        'avgvotes',
        isTShirtCards(),
        'isTscards',
        getTotalVotes(),
        'getTotalVotes',
        getTotalUsers(),
        'getTotalUsers',
        getStayCount(),
        'getStayCount'
      )
    }
    return roomSettings && roomSettings.isCardsVisible
      ? isTShirtCards()
        ? getTShirtVotesValue()
        : getAverageVotes()
      : '?'
  }

  const getTotalUsers = () => {
    return Object.keys(votes).length
  }

  return (
    <List>
      {isOwner && (
        <RoomOptions isDisabled={!isOwner} sendMessage={sendMessage} />
      )}
      <ListItem>
        <ListItemText>Total connected users:</ListItemText>
        <b>{getTotalUsers()}</b>
      </ListItem>
      <ListItem>
        <ListItemText>Average of votes:</ListItemText>
        <b>{getFinalVote()}</b>
      </ListItem>
      {roomSettings &&
        Object.keys(votes).map((id: string) => (
          <UserCard
            key={id}
            name={votes[id].clientName}
            lastVote={votes[id].vote}
            isOwner={votes[id].owner}
            isCardsVisible={roomSettings.isCardsVisible}
            isMyVote={id === clientId}
          />
        ))}
    </List>
  )
}
