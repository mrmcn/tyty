import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useModalContext from '../../../../../../context/modal'
import { calculations } from '../../../../../../services/utilities'

export default function BottomStack({ cart }) {
  const { setOpenCart } = useModalContext()
  const { totalPrice, totalPriceWithDiscount, totalDiscount } =
    calculations(cart)

  return (
    <Stack>
      <Box>
        <Typography>Total price with discount: {totalPrice}</Typography>
        <Typography>Total discount: -{totalDiscount}</Typography>
        <Typography color='red'>
          Total price with discount: {totalPriceWithDiscount}
        </Typography>
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
