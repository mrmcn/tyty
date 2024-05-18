import { userCart } from '../../../services'

export const allAboutAction = ({ request }) => {
  userCart.updateCart(request)

  return null
}
