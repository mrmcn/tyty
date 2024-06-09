import { instance } from '../../api'
import { url as urlAPI } from '../../api/url'
import { queryClient } from '../../query-client'
import { userCart } from '../../services'
import { queryKey } from '../../services/const'

export const layoutLoader = async ({ request }) => {
  const url = new URL(request.url)
  const { search } = Object.fromEntries(url.searchParams)

  return {
    categories: queryClient.fetchQuery({
      queryKey: [queryKey.categories],
      queryFn: () => instance(urlAPI.categories),
      staleTime: Infinity,
      gcTime: 60 * 60 * 1000,
    }),
    cart: await userCart.cart(),
    searchProduct:
      search &&
      (await queryClient.fetchQuery({
        queryKey: [queryKey.search, url.searchParams],
        queryFn: () => instance(urlAPI.search, { params: url.searchParams }),
      })),
  }
}
