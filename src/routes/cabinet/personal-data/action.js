import { redirect } from 'react-router-dom'
import { queryKey } from '../../../const'
import { queryClient } from '../../../query-client'
import { personalData } from '../../../services'

export const personalDataAction = async ({ request }) => {
  const response = await queryClient.fetchQuery({
    queryKey: [queryKey.account],
    queryFn: () => personalData.account(request),
  })

  if (response.isDeleted) {
    console.log('isDeleted')

    return redirect('/')
  }

  return null
}
