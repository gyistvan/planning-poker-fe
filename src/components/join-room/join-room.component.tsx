import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  changeJoinRoomVisibility,
  changeSocketUrl,
  showAlert,
} from '../../store/app/app.slice'
import { changeRoomName } from '../../store/room/room.slice'
import { createAlertObj } from '../../utils/create-alert-obj'
import { ClientNameInput } from '../room/client-name-input/client-name-input.component'
import CreateJoinRoom from '../room/create-join-room/create-join-room.component'

export const JoinRoom = () => {
  let { roomName } = useParams()
  const { clientId, clientName, isClientNameSaved } = useSelector(
    (state: any) => state.app
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const joinRoom = async () => {
    let {
      data: { port },
    } = await axios.post(`joinRoom/${roomName}/${clientId}/${clientName}`)
    await dispatch(changeRoomName(roomName))
    await dispatch(changeSocketUrl(port))
    await dispatch(changeJoinRoomVisibility(false))
    await dispatch(
      showAlert(
        createAlertObj(
          'Joined to room',
          `You have been joined to room: ${roomName}`,
          'success'
        )
      )
    )

    navigate('/')
  }

  useEffect(() => {
    if (roomName && clientId && clientName && isClientNameSaved) {
      joinRoom()
    }
  }, [roomName, clientId, clientName, isClientNameSaved])

  return (
    <>
      <ClientNameInput />
      {!roomName && <CreateJoinRoom type="join" />}
      {
        //clientId && socketUrl && <ActualRoom />
      }
    </>
  )
}
