import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import InfoSupplement from '../common/info-supplement'
import ImagesList from './components/image-list'
import PhotoBack from './fallback'

export default function Photo() {
  const { product } = useLoaderData()

  return (
    <Box>
      <Suspense fallback={<PhotoBack />}>
        <Await resolve={product}>
          {({ title }) => (
            <Typography
              variant='h4'
              sx={{ mt: 3, mb: 2 }}
            >
              {title}
            </Typography>
          )}
        </Await>
      </Suspense>
      <Grid
        container
        spacing={8}
      >
        <Grid
          item
          xs={12}
          sm={7}
          md={6}
        >
          <ImagesList />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          md={6}
        >
          <InfoSupplement />
        </Grid>
      </Grid>
    </Box>
  )
}
