import { defer } from 'react-router-dom'
import { queryKey } from '../../../const'
import { queryClient } from '../../../query-client'
import { products } from '../../../services'

export const PhotoLoader = ({ params }) => {
  return defer({
    product: queryClient.fetchQuery({
      queryKey: [queryKey.product, params.productId],
      queryFn: () => products.product(params.productId),
    }),
  })
}