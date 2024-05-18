import { userCart } from '../../../services'

export const characteristicsAction = ({ request }) => {
  userCart.updateCart(request)

  return null
}
