import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { CARD_OPTIONS } from '../../../utils/cardOptions'
import { useDispatch } from 'react-redux'
import { changeCardVisibility } from '../../../store/room/room.slice'

interface IRoomOptions {
  isDisabled: boolean
  sendMessage: Function
}

export default function RoomOptions(props: IRoomOptions) {
  const { isDisabled, sendMessage } = props
  const [isCardsVisible, setIsCardsVisible] = useState(false)
  const [actualCards, setActualCards] = useState<string | undefined>('0')

  const dispatch = useDispatch()

  useEffect(() => {
    sendMessage(JSON.stringify({ isCardsVisible }))
  }, [isCardsVisible])

  useEffect(() => {
    if (actualCards) {
      sendMessage(
        JSON.stringify({ actualCards: CARD_OPTIONS[parseInt(actualCards)] })
      )
    }
  }, [actualCards])

  const resetRoom = () => {
    dispatch(changeCardVisibility())
    setIsCardsVisible(false)
    sendMessage(JSON.stringify({ isCardsVisible: false, resetRoom: true }))
  }

  return (
    <>
      <ListItem>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cards</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={actualCards}
            label="Age"
            sx={{
              width: '100%',
            }}
            onChange={(e: SelectChangeEvent) => setActualCards(e.target.value)}
            disabled={isDisabled}
          >
            {CARD_OPTIONS.map((cardOption, index) => (
              <MenuItem key={cardOption.name} value={index}>
                {cardOption.name}, (
                {cardOption.cards.map((card) => card.display).join(', ')})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      <ListItem>
        {!isCardsVisible && (
          <Button
            variant="contained"
            onClick={() => setIsCardsVisible(!isCardsVisible)}
            disabled={isDisabled}
          >
            Reveal cards
          </Button>
        )}
        {isCardsVisible && (
          <Button variant="contained" onClick={resetRoom} disabled={isDisabled}>
            Reset room
          </Button>
        )}
      </ListItem>
    </>
  )
}
