import { userCart } from '../../../services'

export const photoAction = async ({ request }) => {
  const formData = await request.formData()
  return await userCart.addProduct(formData)
}
