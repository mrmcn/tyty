import { defer } from 'react-router-dom'
import { instance } from '../../../api'
import { products } from '../../../api/fake'
import { url } from '../../../api/url'
import { queryClient } from '../../../query-client'
import { queryKey } from '../../../services/const'

export const characteristicLoader = ({ params }) => {
  return defer({
    product: queryClient.fetchQuery({
      queryKey: [queryKey.product, params.productId],
      queryFn: () => instance(url.product, { params: params }),
      staleTime: 60 * 60 * 1000,
    }),
    characteristicList: queryClient.fetchQuery({
      queryKey: [queryKey.characteristic],
      queryFn: () => products.characteristicList,
    }),
  })
}
