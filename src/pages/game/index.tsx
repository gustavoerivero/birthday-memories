import React, { useEffect, useState } from 'react'
import { Container, Typography, Stack, Grid, Divider } from '@mui/material'
import MemoryGame from '@/components/MemoryGame'
import { ImageDeckType } from '@/types/CardType'
import ImageCard from '@/components/ImageCard'
import { ImageArray } from '@/utils/ImageArray'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies'

const GamePage = () => {

  const [score, setScore] = useState<number>(Number(getCookie('gameScore')) || 0)
  const [round, setRound] = useState<number>(1)

  const [imageCards, setImageCards] = useState<ImageDeckType>([])
  const [isBuilded, setIsBuilded] = useState(false)

  useEffect(() => {
    if (!isBuilded) {
      buildImageCards()
    }
    console.log('Game Score: ', getCookie('gameScore'))
  }, [isBuilded])

  const buildImageCards = () => {
    const deck = ImageArray
    const shuffledCards = shuffleArray(deck)
    setImageCards(shuffledCards)
    setIsBuilded(true)
  }

  const shuffleArray = (array: ImageDeckType): ImageDeckType => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
  }

  const handleGameComplete = (totalScore: number) => {
    const newScore = score + totalScore
    setCookie('gameScore', String(newScore))
    setScore(newScore)
  }

  const handleRoundComplete = (totalScore: number): void => {
    const newScore = score + totalScore
    setCookie('gameScore', String(newScore))
    setScore(newScore)
    const r = round
    flipCard(r)
    setRound(r + 1)
  }

  const flipCard = (round: number): void => {
    const newDeck = imageCards.map(c => {
      if (c.id === round) {
        return {
          ...c,
          flipped: true
        }
      }
      return c
    })
    setImageCards(newDeck)
  }

  const handleResetGame = () => {
    setImageCards([])
    setIsBuilded(false)
    setScore(0)
    removeCookie('gameScore')
    setRound(1)
  }

  return (
    <Container>
      <Stack
        my={2}
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Typography
          variant='h4'
          component='h1'
        >
          Birthday Memories
        </Typography>
      </Stack>
      <Divider />
      <Stack
        mt={1}
        width='100%'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography
          variant='h6'
          component='h2'
          fontWeight='bold'
        >
          Score: {score}
        </Typography>
        <Typography
          variant='h6'
          component='h2'
          fontWeight='bold'
        >
          Round: {round}
        </Typography>
      </Stack>
      <MemoryGame
        round={round}
        onGameComplete={handleGameComplete}
        onRoundComplete={handleRoundComplete}
        onGameReset={handleResetGame}
      />
      <Divider />
      <Typography
        textAlign='center'
        my={2}
        variant='h5'
      >
        Collection
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        {imageCards.length > 0 && imageCards.map(card => (
          <Grid item key={card.id}>
            <ImageCard
              id={card.id.toString()}
              card={card}
            />
          </Grid>
        ))}
      </Grid>
      <Stack
        justifyContent='flex-end'
        alignItems='center'
        my={3}
      >
        <Divider variant='middle' />
        <Typography
          variant='caption'
          component='p'
          fontWeight='bold'
        >
          goosestabbo || {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Container>
  )
}


export default GamePage