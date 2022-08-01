import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Logo from '../../assets/img/logo.png'
import { useAppSelector } from '../../store/app/app.slice'
import { InvitePlayerDialog } from '../invite-player-dialog/invite-player-dialog.component'
import { cName, headerRight, headerWrapper, logo } from './header.style'

export default function Header() {
  const { clientName } = useAppSelector()
  return (
    <Box role="heading" sx={headerWrapper}>
      <img src={Logo} alt="planning poker logo" style={{ ...logo }} />
      {clientName && (
        <Box sx={headerRight}>
          <InvitePlayerDialog />
          <Avatar>{clientName.charAt(0)}</Avatar>
          <Typography variant="h5" sx={cName}>
            {clientName}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
