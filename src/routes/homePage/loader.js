import { defer } from 'react-router-dom'
import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { products } from '../../services'

export const homePageLoader = () => {
  return defer({
    categories: queryClient.fetchQuery({
      queryKey: [queryKey.categories],
      queryFn: () => products.categories(),
      staleTime: Infinity,
    }),
    banners: queryClient.fetchQuery({
      queryKey: [queryKey.banners],
      queryFn: () => products.banners,
      staleTime: Infinity,
    }),
  })
}
