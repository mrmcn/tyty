import { queryKey } from '../../const'
import { queryClient } from '../../query-client'
import { personalData } from '../../services'

export const checkoutPageAction = async ({ request }) => {
  await queryClient.fetchQuery({
    queryKey: [queryKey.account],
    queryFn: () => personalData.account(request),
  })
  return null
}
