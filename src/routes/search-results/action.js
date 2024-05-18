import { userCart } from '../../services'

export const searchResultsAction = ({ request }) => {
  userCart.updateCart(request)

  return null
}
