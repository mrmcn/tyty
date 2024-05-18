import { defer } from 'react-router-dom'
import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { products } from '../../services'

export const searchResultsLoader = async ({ request }) => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: [queryKey.search, request],
      queryFn: () => products.search(request),
    }),
  })
}
