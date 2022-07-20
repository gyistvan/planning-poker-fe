import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  changeJoinRoomVisibility,
  changeSocketUrl,
} from '../../store/app/app.slice'
import { ClientNameInput } from '../room/ClientNameInput/ClientNameInput'
import CreateJoinRoom from '../room/CreateJoinRoom'

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
    await dispatch(changeSocketUrl(port))
    await dispatch(changeJoinRoomVisibility(false))

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
