import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import ProductsCategories from './components/products-categories'

export default function HomePage() {
  const { banners } = useLoaderData()
  const listItem = (res) =>
    res.map((item) => (
      <Banner
        key={nanoid()}
        {...item}
      />
    ))

  return (
    <Box sx={{ flexGrow: 1, m: 1 }}>
      <Grid
        container
        spacing={{ md: 2, lg: 3 }}
      >
        <Grid
          item
          md={4}
          lg={3}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <ProductsCategories />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
        >
          <Grid
            container
            spacing={1}
            component='article'
          >
            <Suspense fallback={<div>!!!!!!!!!!!!!!!!!!</div>}>
              <Await resolve={banners}>{listItem}</Await>
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

function Banner({ height, image, content, route, bp }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <Grid
      item
      {...bp}
    >
      <Card
        raised
        component='article'
      >
        <CardActionArea href={route}>
          <CardMedia
            component='img'
            height={matches ? height : '135'}
            image={image}
            alt='banner'
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography
              noWrap
              variant='body2'
              color='text.secondary'
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
