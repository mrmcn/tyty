import { defer, redirect } from 'react-router-dom'
import { queryKey } from '../../../const'
import { queryClient } from '../../../query-client'
import { auth, personalData } from '../../../services'

export const personalDataLoader = ({ request }) => {
  const check = auth.check(request)

  if (check !== null) {
    return redirect('/login?' + check)
  }
  return defer({
    data: queryClient.fetchQuery({
      queryKey: [queryKey.personalData],
      queryFn: () => personalData.all(),
    }),
  })
}
