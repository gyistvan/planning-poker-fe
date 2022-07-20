import {
  Button,
  Dialog,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box } from '@mui/system'

interface IInvitePlayerDialog {}

export const InvitePlayerDialog: React.FC<IInvitePlayerDialog> = () => {
  const [isInvitePlayerDialogOpen, setIsInvitePlayerDialogOpen] =
    useState(false)
  const { socketUrl } = useSelector((state: any) => state.app)
  const { roomName } = useSelector((state: any) => state.roomSettings)

  const getRoomUrl = (): string => window.location.href + 'joinRoom/' + roomName

  const copyUrlToClipBoard = () => {
    navigator.clipboard.writeText(getRoomUrl())
    setIsInvitePlayerDialogOpen(false)
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
