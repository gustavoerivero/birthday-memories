import React from 'react'
import { Grid, Typography, Stack, Divider, Container, Button } from '@mui/material'
import { ProfileImageArray } from '@/utils/ProfileImageArray'
import ProfileCard from '@/components/ProfileCard'
import { useRouter } from 'next/router'
import { getCookie, removeCookie } from '@/utils/cookies'

const ResultPage = () => {

  const score = getCookie('gameScore') || 0
  const profiles = ProfileImageArray
  const router = useRouter()

  const handleBackMenu = () => {
    removeCookie('gameScore')
    router.push('/')
  }

  return (
    <Container>
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
      <Stack>
        <Typography
          component='h2'
          variant='h6'
          fontWeight='bold'
        >
          Your score: {score}
        </Typography>
        <Typography
          component='h2'
          variant='h5'
          fontWeight='bold'
        >
          Rewards:
        </Typography>
      </Stack>
      <Grid
        container
        py={2}
        spacing={2}
        justifyContent='center'
        alignItems='center'
      >
        {profiles.length > 0 && profiles.map(profile => (
          <Grid key={profile.id} item>
            <ProfileCard
              card={profile}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Stack
      mt={2}
        justifyContent='center'
        alignItems='center'
      >
        <Button
          variant='contained'
          onClick={handleBackMenu}
        >
          Back to menu
        </Button>
      </Stack>
    </Container>
  )
}

export default ResultPage