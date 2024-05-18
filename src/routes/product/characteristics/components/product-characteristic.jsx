import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import ListBack from './fallback'

export default function ProductCharacteristic() {
  const { characteristicList } = useLoaderData()
  const itemList = (res) =>
    res.map((item) => (
      <Item
        key={nanoid()}
        item={item}
      />
    ))

  return (
    <List>
      <Grid
        container
        rowSpacing={2}
      >
        <Suspense fallback={<ListBack />}>
          <Await resolve={characteristicList}>{itemList}</Await>
        </Suspense>
      </Grid>
    </List>
  )
}

function Item({ item }) {
  return (
    <ListItem>
      <Grid
        item
        xs={10}
      >
        <Typography>{item.name}</Typography>
      </Grid>
      <Grid
        item
        xs={2}
      >
        <Typography>{item.value}</Typography>
      </Grid>
    </ListItem>
  )
}
