import { Box, Button, TextField } from '@mui/material'
import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeClientName, saveClientName } from '../../../store/app/app.slice'

export const ClientNameInput = () => {
  const { clientName, isClientNameSaved } = useSelector(
    (state: any) => state.app
  )
  const dispatch = useDispatch()
  const saveName = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(saveClientName())
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
      {!isClientNameSaved && (
        <>
          <TextField
            label="User name"
            sx={{ m: 1, width: '25ch', alignSelf: 'center' }}
            value={clientName}
            onChange={(e) => dispatch(changeClientName(e.target.value))}
            disabled={isClientNameSaved}
          />

          <Button
            sx={{ m: 1, width: '25ch', alignSelf: 'center' }}
            variant="contained"
            disabled={!clientName}
            onClick={saveName}
          >
            Save
          </Button>
        </>
      )}
    </Box>
  )
}
