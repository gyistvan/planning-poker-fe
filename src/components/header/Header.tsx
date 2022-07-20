import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../assets/img/logo.png'
import { InvitePlayerDialog } from '../InvitePlayerModal/InvitePlayerDialog'
import styles from './Header.module.css'

export default function Header() {
  const { clientName } = useSelector((state: any) => state.app)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 'lg',
        margin: 'auto',
        height: '10vh',
        minHeight: '110px',
      }}
    >
      <header>
        <img src={Logo} alt="planning poker logo" className={styles.logo} />
      </header>
      {clientName && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InvitePlayerDialog />
          <Avatar>{clientName.charAt(0)}</Avatar>
          <Typography variant="h5" sx={{ m: 2 }}>
            {clientName}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
