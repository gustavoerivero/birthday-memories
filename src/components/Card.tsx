import React from 'react'
import { Card as MuiCard, CardContent, Typography, CardProps, Stack } from '@mui/material'
import { CardType } from '@/types/CardType'
import { CardIcons } from '@/utils/CardIcons'

interface ICardProps extends CardProps {
  card: CardType
  onCardClick: (card: CardType) => void
}

const Card: React.FC<ICardProps> = ({ card, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick(card)
  }

  return (
    <MuiCard
      onClick={handleCardClick}
      sx={{
        background: card.flipped ? 'rgba(255, 127, 224, 0.2)' : '#d70588',
        cursor: card.flipped ? 'default' : 'pointer',
        width: '175px',
        height: '175px'
      }}
    >
      <CardContent
        sx={{
          height: '100%'
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Typography
            variant='body2'
            component='p'
            sx={{
              color: card.flipped ? '#000' : '#fff'
            }}
          >
            {card.flipped &&
              CardIcons.find(i => i.id === card.value)?.icon
            }
          </Typography>
        </Stack>
      </CardContent>
    </MuiCard>
  )
}

export default Card