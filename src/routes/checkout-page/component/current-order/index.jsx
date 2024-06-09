import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { useFetcher, useLoaderData } from 'react-router-dom'
import Item from '../item'

export default function CurrentOrder() {
  const fetcher = useFetcher()
  const { cart } = useLoaderData()
  const sendCart = cart?.productsCart.map((product) => {
    return { id: product.id, quantity: product.quantity }
  })
  if (cart === null) return <IsEmpty />
  const itemList = cart.productsCart.map((item) => (
    <Item
      key={nanoid()}
      {...item}
    />
  ))

  return (
    <Box sx={{ m: 2 }}>
      <Typography
        variant='h4'
        component='div'
      >
        Current order
      </Typography>
      <List dense>
        {itemList}
        <Divider />
        <ListItem>
          <ListItemText primary='Total discount:' />
          <Typography>-{cart.totalDiscount}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary='To pay:' />
          <Typography>{cart.totalPriceWithDiscount}</Typography>
        </ListItem>
      </List>
      <Box
        component={fetcher.Form}
        method='post'
      >
        <Button
          value={JSON.stringify(sendCart)}
          type='submit'
          name='sendCart'
          variant='contained'
          color='success'
          fullWidth
        >
          Confirm your purchase
        </Button>
      </Box>
    </Box>
  )
}

function IsEmpty() {
  return (
    <Typography
      variant='h4'
      align='center'
      sx={{ m: 2 }}
    >
      Thank you for your purchase!
    </Typography>
  )
}
