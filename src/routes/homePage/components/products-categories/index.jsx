import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Fallback from './fallback'

export default function ProductsCategories() {
  const { categories } = useLoaderData()
  const itemList = (res) =>
    res.map((category) => (
      <Item
        key={category}
        category={category}
        primary={category}
      />
    ))

  return (
    <Paper
      component='aside'
      elevation={8}
    >
      <List
        disablePadding={true}
        dense
        aria-label='categories menu'
      >
        <Suspense fallback={<Fallback />}>
          <Await resolve={categories}>{itemList}</Await>
        </Suspense>
      </List>
    </Paper>
  )
}

export function Item({ category, primary }) {
  return (
    <ListItem
      disablePadding={true}
      dense
    >
      <ListItemButton
        dense
        href={`/categories/${category}`}
      >
        <ListItemText
          inset
          primary={primary}
        />
      </ListItemButton>
    </ListItem>
  )
}
