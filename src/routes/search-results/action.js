import { userCart } from '../../services'

export const searchResultsAction = async ({ request }) => {
  const formData = await request.formData()
  return await userCart.addProduct(formData)
}
