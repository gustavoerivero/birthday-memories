import React, { useEffect, useState } from 'react'
import { Container, Typography, Stack, Divider, Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = () => {
    try {
      setIsLoading(true)
      router.push('/game')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Stack
        minHeight='100%'
        justifyContent='space-between'
      >
        <Stack
          mt={2}
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
        <Divider variant='middle' />
        <Stack
          justifyContent='flex-end'
          alignItems='center'
        >
          <Typography
            variant='caption'
            component='p'
            fontWeight='bold'
          >
            goosestabbo || {new Date().getFullYear()}
          </Typography>
        </Stack>
        <Stack
          my={3}
          width='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            variant='contained'
            disabled={isLoading}
            onClick={handleStart}
          >
            Start Game
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
