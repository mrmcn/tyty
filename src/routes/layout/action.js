import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { products, userCart } from '../../services'
import { storage } from '../../services/utilities'

export const layoutAction = async ({ request }) => {
  if (request.method === 'PUT') {
    const response = await queryClient.fetchQuery({
      queryKey: [queryKey.search, request],
      queryFn: () => products.search(request),
    })

    return response
  } else {
    const newCart = await userCart.editCart(request)
    storage.setCart(JSON.stringify(newCart))

    return null
  }
}
