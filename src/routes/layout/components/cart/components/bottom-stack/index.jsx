import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useModalContext from '../../../../../../context/modal'

export default function BottomStack({ cart }) {
  const { setOpenCart } = useModalContext()
  const total = cart
    .map((product) => product.price * product.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
  const withDiscount = cart
    .map((product) => product.discountedPrice * product.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
  const totalDiscount = total - withDiscount

  return (
    <Stack>
      <Box>
        <Typography>Total: {total}</Typography>
        <Typography>With discount: {withDiscount}</Typography>
        <Typography>Total discount: {totalDiscount}</Typography>
      </Box>
      <Button
        variant='outlined'
        color='success'
        href='checkout-page'
        onClick={() => setOpenCart(false)}
      >
        <Typography>checkout page</Typography>
      </Button>
    </Stack>
  )
}
