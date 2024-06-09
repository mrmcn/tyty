import { defer } from 'react-router-dom'
import { instance } from '../../api'
import { url as urlAPI } from '../../api/url'
import { queryClient } from '../../query-client'
import { queryKey } from '../../services/const'

export const searchResultsLoader = ({ request }) => {
  const url = new URL(request.url)

  return defer({
    categoryProducts: queryClient.fetchQuery({
      queryKey: [queryKey.search, url.searchParams],
      queryFn: () => instance(urlAPI.search, { params: url.searchParams }),
    }),
  })
}
