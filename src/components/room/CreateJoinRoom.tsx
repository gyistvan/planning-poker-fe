import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeCreateRoomVisibility,
  changeJoinRoomVisibility,
  changeSocketUrl,
} from '../../store/app/app.slice'
import { changeRoomName } from '../../store/room/room.slice'

interface ICreateRoom {
  type: string
}

export default function CreateJoinRoom(props: ICreateRoom) {
  const { type } = props
  const { clientId, clientName } = useSelector((state: any) => state.app)
  const { roomName } = useSelector((state: any) => state.roomSettings)
  const dispatch = useDispatch()
  console.log('type', type)

  const createRoom = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios
      .post(`createRoom/${roomName}/${clientId}/${clientName}`)
      .then((response: any) => {
        dispatch(changeSocketUrl(response.data.port))
        dispatch(changeCreateRoomVisibility(false))
      })
  }

  const joinRoom = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios
      .post(`joinRoom/${roomName}/${clientId}/${clientName}`)
      .then((response: any) => {
        dispatch(changeSocketUrl(response.data.port))
        dispatch(changeJoinRoomVisibility(false))
      })
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ m: 1, width: '25ch', alignSelf: 'center' }}
        label="Room name"
        value={roomName ? roomName : ''}
        onChange={(e) => dispatch(changeRoomName(e.target.value))}
      />
      <Button
        sx={{ m: 1, width: '25ch', alignSelf: 'center' }}
        variant="contained"
        onClick={type === 'create' ? createRoom : joinRoom}
      >
        {type === 'create' ? 'Create room' : 'Join room'}
      </Button>
    </Box>
  )
}
