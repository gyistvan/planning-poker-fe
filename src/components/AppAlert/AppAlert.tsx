import React, { useEffect } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { hideAlert, useAppSelector } from '../../store/app/app.slice'
import { useDispatch } from 'react-redux'

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
      <Alert
        severity={alertType}
        sx={{
          position: 'absolute',
          width: '100%',
          zIndex: '10000',
        }}
      >
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        {alertMessage}
      </Alert>
    )
  )
}
