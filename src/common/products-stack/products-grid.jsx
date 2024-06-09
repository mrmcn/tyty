import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Fallback from './fallback'
import Item from './item'

export default function Products({ sx }) {
  const { categoryProducts } = useLoaderData()
  const itemList = (items) =>
    items.map((item) => (
      <Item
        key={item.id}
        {...item}
      />
    ))
  const fallbackList = Array.from(new Array(8)).map(() => (
    <Fallback key={nanoid()} />
  ))

  return (
    <Box sx={sx}>
      <Grid
        component='article'
        container
        spacing={{ xs: 1, md: 2 }}
      >
        <Suspense fallback={fallbackList}>
          <Await resolve={categoryProducts}>{itemList}</Await>
        </Suspense>
      </Grid>
    </Box>
  )
}
