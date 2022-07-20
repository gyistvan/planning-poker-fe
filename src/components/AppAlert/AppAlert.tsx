import React, { useState } from 'react'
import { Alert } from '@mui/material'

interface IAppAlert {
  type: 'error' | 'info' | 'success'
  message: string
  timeout: number
}

export const AppAlert: React.FC<IAppAlert> = ({
  type,
  message,
  timeout = 5000,
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true)

  setTimeout(() => {
    setIsAlertVisible(false)
  }, timeout)
  return <Alert severity={type}>{message}</Alert>
}
