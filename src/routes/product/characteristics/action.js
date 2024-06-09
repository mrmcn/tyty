import { userCart } from '../../../services'

export const characteristicsAction = async ({ request }) => {
  const formData = await request.formData()
  return await userCart.addProduct(formData)
}
