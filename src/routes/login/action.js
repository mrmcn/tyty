import { redirect } from 'react-router-dom'
import { instance } from '../../api'
import { url } from '../../api/url'
import { queryClient } from '../../query-client'
import { auth } from '../../services'
import { queryKey } from '../../services/const'

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const { redirectTo } = Object.fromEntries(formData)
  const response = await queryClient.fetchQuery({
    queryKey: [queryKey.login, formData],
    queryFn: () => instance.post(url.login, formData),
  })
  auth.setUserId(response.id)
  auth.setTokens(response.token, response.refreshToken)

  return redirect(redirectTo || '/')
}
