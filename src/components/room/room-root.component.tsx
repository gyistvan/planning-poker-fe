import React from 'react'
import ActualRoom from './actual-room/actual-room.component'
import CreateJoinRoom from './create-join-room/create-join-room.component'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeCreateRoomVisibility,
  changeJoinRoomVisibility,
} from '../../store/app/app.slice'
import { ClientNameInput } from './client-name-input/client-name-input.component'

export default function RoomRoot() {
  const {
    socketUrl,
    clientId,
    clientName,
    isClientNameSaved,
    isCreateRoomVisible,
    isJoinRoomVisible,
  } = useSelector((state: any) => state.app)
  const dispatch = useDispatch()

  return (
    <Box sx={{ background: '#e0e0e0', height: '90vh', overflow: 'hidden' }}>
      <ClientNameInput />
      {clientName && isClientNameSaved && !socketUrl && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Do you want to
          <Button
            variant="contained"
            onClick={() => dispatch(changeCreateRoomVisibility(true))}
            sx={{ m: 2 }}
          >
            Create a room
          </Button>
          or
          <Button
            variant="contained"
            onClick={() => dispatch(changeJoinRoomVisibility(true))}
            sx={{ m: 2 }}
          >
            Join to a room
          </Button>
        </Box>
      )}
      {clientName && isClientNameSaved && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {isCreateRoomVisible && <CreateJoinRoom type="create" />}
            {isJoinRoomVisible && <CreateJoinRoom type="join" />}
          </Box>

          {socketUrl && clientId && <ActualRoom />}
        </>
      )}
    </Box>
  )
}
