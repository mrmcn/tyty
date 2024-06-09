import { userCart } from '../../services'

export const categoryAction = async ({ request }) => {
  const formData = await request.formData()
  return await userCart.addProduct(formData)
}
