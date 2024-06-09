import { instance } from '../../api'
import { url } from '../../api/url'
import { queryClient } from '../../query-client'
import { queryKey } from '../../services/const'

export const logUpLoader = async ({ request }) => {
  const formData = await request.formData()
  const newAccount = await queryClient.fetchQuery({
    queryKey: [queryKey.logUp, formData],
    queryFn: () => instance.post(url.accAdd, formData),
  })
  console.log('newAccount', newAccount)

  return newAccount
}
