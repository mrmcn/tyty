import { userCart } from '../../services'

export const categoryAction = ({ request }) => {
  userCart.updateCart(request)

  return null
}
