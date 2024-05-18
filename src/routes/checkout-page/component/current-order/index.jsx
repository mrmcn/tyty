import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { storage } from '../../../../services/utilities'

export default function CurrentOrder() {
  const cart = JSON.parse(storage.getCart())

  const itemList = cart.map((item) => (
    <Item
      key={nanoid()}
      {...item}
    />
  ))
  console.log(cart)

  return (
    <Box>
      <Typography
        sx={{ mt: 4, mb: 2 }}
        variant='h6'
        component='div'
      >
        Avatar with text and icon
      </Typography>
      <List dense>
        {itemList}
        <ListItem>
          <ListItemText primary='Total discount:' />
          <Typography>-{cart.totalDiscount}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary='To pay:' />
          <Typography>{cart.withDiscount}</Typography>
        </ListItem>
      </List>
    </Box>
  )
}

function Item(item) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt=''
          src={item.thumbnail}
          variant='rounded'
          sx={{ width: 40, height: 40 }}
        />
      </ListItemAvatar>
      <ListItemText primary={item.title} />
      <Typography
        variant={item.discountPercentage > 0 ? 'body2' : 'body1'}
        sx={{
          textDecoration: item.discountPercentage > 0 ? 'line-through' : null,
        }}
      >
        ${item.price}
      </Typography>
      <Typography
        sx={{
          ml: 1,
          visibility: item.stock === 0 ? 'hidden' : 'visible',
          color: item.stock !== 0 ? 'red' : null,
        }}
      >
        ${item.discountedPrice}
      </Typography>
    </ListItem>
  )
}
