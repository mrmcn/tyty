import { userCart } from '../../../services'

export const photoAction = ({ request }) => {
  userCart.updateCart(request)

  return null
}
