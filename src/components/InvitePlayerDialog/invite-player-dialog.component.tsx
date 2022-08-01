import { Button, Dialog, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box } from '@mui/system'
import { showAlert } from '../../store/app/app.slice'
import { createAlertObj } from '../../utils/create-alert-obj'

interface IInvitePlayerDialog {}

export const InvitePlayerDialog: React.FC<IInvitePlayerDialog> = () => {
  const [isInvitePlayerDialogOpen, setIsInvitePlayerDialogOpen] =
    useState(false)
  const { socketUrl } = useSelector((state: any) => state.app)
  const { roomName } = useSelector((state: any) => state.roomSettings)
  const dispatch = useDispatch()

  const getRoomUrl = (): string => window.location.href + 'joinRoom/' + roomName

  const copyUrlToClipBoard = () => {
    navigator.clipboard.writeText(getRoomUrl())
    setIsInvitePlayerDialogOpen(false)
    dispatch(showAlert(createAlertObj(undefined, 'Copied', 'info')))
  }

  return (
    <>
      {socketUrl && roomName && (
        <>
          <Button
            variant="contained"
            onClick={() => setIsInvitePlayerDialogOpen(true)}
            sx={{ m: 2 }}
          >
            Invite players
          </Button>
          <Dialog
            open={isInvitePlayerDialogOpen}
            onClose={() => setIsInvitePlayerDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Invite players to your room</DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Room url"
                fullWidth
                disabled
                value={getRoomUrl()}
              />
              <ContentCopyIcon
                sx={{ m: 2, cursor: 'pointer' }}
                onClick={() => copyUrlToClipBoard()}
              />
            </Box>
          </Dialog>
        </>
      )}
    </>
  )
}
