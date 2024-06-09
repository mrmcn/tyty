import { defer, redirect } from 'react-router-dom'
import { instance } from '../../../api'
import { url } from '../../../api/url'
import { queryClient } from '../../../query-client'
import { auth } from '../../../services'
import { queryKey } from '../../../services/const'

export const orderListLoader = async ({ request }) => {
  const check = auth.check(request)

  if (check !== null) {
    return redirect('/login?' + check)
  }

  // return defer({
  //   orderList: queryClient.fetchQuery({
  //     queryKey: [queryKey.getOrders],
  //     queryFn: () => instance(url.getOrders),
  //   }),
  // })
  return null
}
