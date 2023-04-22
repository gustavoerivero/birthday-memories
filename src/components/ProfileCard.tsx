import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardProps, Divider } from '@mui/material'
import { ProfileCardType } from '@/types/CardType'

interface IImageCard extends CardProps {
  card: ProfileCardType
}

const ProfileCard: React.FC<IImageCard> = ({ card }) => {
  return (
    <Card
      elevation={5}
      sx={{
        width: 250,
        height: 415,
        background: 'rgba(255, 127, 224, 0.2)',
      }}
    >
      <CardMedia
        sx={{
          height: 250
        }}
        image={card.image}
        title={card.title}
      />
      <CardContent>
        <Typography
          variant='h6'
          fontWeight='bold'
        >
          {card.title}
        </Typography>
        <Divider />
        <Typography
          pt={1}
          textAlign='center'
          lineHeight={1.2}
          variant='body2'
          color='text.secondary'
        >
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileCard