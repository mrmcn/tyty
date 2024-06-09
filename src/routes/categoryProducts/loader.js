import { defer } from 'react-router-dom'
import { instance } from '../../api'
import { url as urlAPI } from '../../api/url'
import { queryClient } from '../../query-client'
import { queryKey } from '../../services/const'

export const categoriesLoader = async ({ request, params }) => {
  const url = new URL(request.url)
  const { categoryProducts, allBrands } = await queryClient.fetchQuery({
    queryKey: [
      queryKey.brands,
      Object.fromEntries(url.searchParams),
      params.category,
    ],
    queryFn: () =>
      instance(urlAPI.categoryProducts, {
        params: { params: url.searchParams, category: params.category },
      }),
    staleTime: 60 * 60 * 1000,
  })

  return defer({ categoryProducts, allBrands })
}
