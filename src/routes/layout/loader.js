import { defer } from 'react-router-dom'
import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { products } from '../../services'

export const layoutLoader = () => {
  return defer({
    categories: queryClient.fetchQuery({
      queryKey: [queryKey.categories],
      queryFn: () => products.categories(),
      staleTime: Infinity,
    }),
  })
}
