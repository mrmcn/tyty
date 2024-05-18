import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { useFetcher } from 'react-router-dom'
import useModalContext from '../../../../context/modal'
import { storage } from '../../../../services/utilities'
import BottomStack from './components/bottom-stack'
import Item from './components/item'

export default function Cart() {
  const { openCart, setOpenCart } = useModalContext()
  const fetcher = useFetcher()
  const cart = JSON.parse(storage.getCart())
  const cartList =
    cart &&
    cart.map((item) => (
      <Item
        key={nanoid()}
        item={item}
        fetcher={fetcher}
      />
    ))

  return (
    <>
      <IconButton
        aria-label='cart'
        color='inherit'
        size='large'
        onClick={() => setOpenCart(true)}
      >
        <Badge
          badgeContent={cart?.length}
          color='warning'
          max={99}
        >
          <ShoppingCartIcon fontSize='inherit' />
        </Badge>
      </IconButton>
      <Dialog
        onClose={() => setOpenCart(false)}
        open={openCart}
        aria-label='dialog-cart'
      >
        <DialogTitle
          variant='h4'
          align='center'
        >
          Cart
        </DialogTitle>
        <DialogContent>
          {cart?.length > 0 ? (
            <>
              <List aria-label='products to cart'>{cartList}</List>
              <Divider />
              <BottomStack cart={cart} />
            </>
          ) : (
            <Typography align='center'>cart is empty</Typography>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  )
}
