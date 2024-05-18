import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { personalData } from '../../services'

export const logUpLoader = async ({ request }) => {
  const newAccount = await queryClient.fetchQuery({
    queryKey: [queryKey.logUp, request],
    queryFn: () => personalData.add(request),
  })
  console.log('newAccount', newAccount)

  return newAccount
}
