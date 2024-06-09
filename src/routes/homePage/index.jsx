import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Banner from './components/banner'
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
