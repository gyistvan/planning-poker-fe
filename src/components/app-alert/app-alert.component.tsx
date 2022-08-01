import React, { useEffect } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { hideAlert, useAppSelector } from '../../store/app/app.slice'
import { useDispatch } from 'react-redux'
import { alert } from './app-alert.style'

export const AppAlert = () => {
  const { isAlertVisible, alertMessage, alertType, alertTitle } =
    useAppSelector()
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideAlert())
    }, 5000)
  }, [isAlertVisible])

  return (
    isAlertVisible && (
      <Alert severity={alertType} sx={alert}>
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        {alertMessage}
      </Alert>
    )
  )
}
