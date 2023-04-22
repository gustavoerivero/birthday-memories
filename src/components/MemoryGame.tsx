import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack } from '@mui/material'
import Card from './Card'
import { CardType, DeckType } from '@/types/CardType'
import Timer from './Timer'
import { ImageArray } from '@/utils/ImageArray'
import { useRouter } from 'next/router'

interface GameBoardProps {
  onGameComplete: (score: number) => void
  onRoundComplete: (score: number) => void
  onGameReset: () => void
  round: number
}

const MemoryGame: React.FC<GameBoardProps> = ({ round, onGameComplete, onRoundComplete, onGameReset }) => {

  const [isBuilded, setIsBuilded] = useState(false)
  const [cards, setCards] = useState<DeckType>([])
  const [flippedCards, setFlippedCards] = useState<DeckType>([])
  const [isGameStarted, setIsGameStarted] = useState(false)

  const [time, setTime] = useState(0)
  const [score, setScore] = useState(0)

  const [isRoundComplete, setIsRoundComplete] = useState(false)

  const router = useRouter()

  let interval: any = null

  useEffect(() => {
    if (isGameStarted) {
      interval = setInterval(() => {
        setTime(t => t + 1)
      }, 10)
    } else if (!isGameStarted && time !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [time, isGameStarted])

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.flipped)) {
      const timeScore = Math.floor(1000 - time / 10)
      const totalScore = score + timeScore

      setScore(totalScore)
      setIsRoundComplete(true)
      setIsGameStarted(false)
      if (interval) clearInterval(interval)
    }

    if (!isBuilded) {
      buildBoard()
    }
  }, [isBuilded, cards, isGameStarted, interval])

  const buildBoard = () => {
    const cardData = createDeck()
    const duplicatedCards = duplicateDeck(cardData)
    const shuffledCards = shuffleArray(duplicatedCards)
    setCards(shuffledCards)
    setIsBuilded(true)
  }

  const createDeck = (): DeckType => {
    return Array.from({ length: 6 }, (_, i) => ({ id: i + 1, value: i + 1, content: `Card ${i + 1}`, flipped: false }))
  }

  const duplicateDeck = (array: DeckType): DeckType => {
    const newArray = [...array]
    const lastId = array[array.length - 1].id
    const duplicatedArray = array.map(item => {
      return { ...item, id: item.id + lastId };
    })
    const combinedArray = newArray.concat(duplicatedArray)
    return combinedArray
  }

  const shuffleArray = (array: DeckType): DeckType => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
  }

  const flipCard = (card: CardType): void => {
    if (!isGameStarted) {
      setIsGameStarted(true)
    }
    if (!card.flipped && flippedCards.length < 2) {
      const updatedCards = cards.map(c => {
        if (c.id === card.id) {
          return { ...c, flipped: true }
        }
        return c
      })

      setCards(updatedCards)
      setFlippedCards([...flippedCards, card])

      if (flippedCards.length === 1) {
        setTimeout(() => {
          const card1 = flippedCards[0]
          const card2 = card
          if (card1.content === card2.content) {
            const updatedCards = cards.map(c => {
              if (c.id === card1.id || c.id === card2.id) {
                return { ...c, flipped: true }
              }
              return c
            })

            setCards(updatedCards)
            setFlippedCards([])
          } else {
            const updatedCards = cards.map(c => {
              if (c.id === card1.id || c.id === card2.id) {
                return { ...c, flipped: false }
              }
              return c
            })

            setCards(updatedCards)
            setFlippedCards([])
          }
        }, 1000)
      }
    }
  };

  const handleCardClick = (card: CardType): void => {
    flipCard(card)
  }

  const handleRoundComplete = (): void => {
    if (isRoundComplete && round < ImageArray.length) {
      onRoundComplete(score)
      setIsRoundComplete(false)
      resetRound()
    } else if (isRoundComplete && round === ImageArray.length) {
      onRoundComplete(score)
      setIsRoundComplete(false)
      resetRound()
      router.push('/results')
    }
  }

  const resetRound = (): void => {
    setTime(0)
    setScore(0)
    setCards([])
    setFlippedCards([])
    setIsBuilded(false)
    setIsGameStarted(false)
  }

  return (
    <div>
      <Stack
        justifyContent='center'
        alignItems='center'
      >
        <Timer time={time} />
      </Stack>
      <Grid
        container
        spacing={2}
        p={2}
      >
        {cards.map(card => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={card.id}
          >
            <Card
              card={card}
              onCardClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        container
        spacing={1}
        mb={2}
      >
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          alignItems='center'
          justifyContent='center'
        >
          <Button
            sx={{
              width: 200
            }}
            onClick={onGameReset}
            variant='text'
            color='error'
          >
            Reset game
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          alignItems='center'
          justifyContent='center'
        >
          <Button
            sx={{
              width: 200
            }}
            onClick={resetRound}
            variant='outlined'
            color='secondary'
          >
            Reset round
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          alignItems='center'
          justifyContent='center'
        >
          <Button
            sx={{
              width: 200
            }}
            onClick={handleRoundComplete}
            variant='contained'
            disabled={!isRoundComplete}
          >
            {round === ImageArray.length ? 'Finish Game' : 'Next Round'}
          </Button>
        </Grid>
      </Grid>
    </div>
  )

}

export default MemoryGame