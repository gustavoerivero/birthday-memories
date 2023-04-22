import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardProps } from '@mui/material'
import { ImageCardType } from '@/types/CardType'

interface IImageCard extends CardProps {
  card: ImageCardType
}

const ImageCard: React.FC<IImageCard> = ({ card }) => {
  return (
    <Card
      elevation={5}
      sx={{
        width: 175,
        height: 200,
        background: card.flipped ? 'rgba(255, 127, 224, 0.2)' : '#8a0357',
      }}
    >
      {card.flipped &&
        <>
          <CardMedia
            sx={{
              height: 150
            }}
            image={card.image}
            title={card.title}
          />
          <CardContent>
            <Typography
              variant='caption'
              fontWeight='bold'
              color='text.secondary'
            >
              {card.description}
            </Typography>
          </CardContent>
        </>
      }
    </Card>
  )
}

export default ImageCard