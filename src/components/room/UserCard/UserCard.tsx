import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import StarsIcon from '@mui/icons-material/Stars'
import { Card } from '../../../store/room/room.interface'

interface IUserCard {
  name: string
  lastVote: Card
  isOwner: boolean
  isCardsVisible: boolean
  isMyVote: boolean
}

export default function UserCard(props: IUserCard) {
  const { name, lastVote, isOwner, isCardsVisible, isMyVote } = props

  const createAvatarStr = () => {
    let avatarStr = '?'
    if (name) {
      avatarStr = name
        .split(' ')
        .map((str) => str.charAt(0))
        .join('')
    }
    return avatarStr
  }
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar>{createAvatarStr()}</Avatar>
      </ListItemIcon>
      <ListItemText>
        {name}
        {isOwner && <StarsIcon />}
      </ListItemText>
      <b>
        {(isCardsVisible && lastVote) || (isMyVote && lastVote)
          ? lastVote.display
          : '?'}
      </b>
    </ListItem>
  )
}
