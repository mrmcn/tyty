import { redirect } from 'react-router-dom'
import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { auth } from '../../services'

export const loginAction = async ({ request }) => {
  const { redirectTo } = await queryClient.fetchQuery({
    queryKey: [queryKey.login, request],
    queryFn: () => auth.login(request),
  })

  return redirect(redirectTo || '/')
}
