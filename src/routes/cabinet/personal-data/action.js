import { redirect } from 'react-router-dom'
import { instance } from '../../../api'
import { url } from '../../../api/url'
import { queryClient } from '../../../query-client'
import { auth } from '../../../services'
import { queryKey } from '../../../services/const'

export const personalDataAction = async ({ request }) => {
  const formData = await request.formData()

  if (request.method === 'DELETE') {
    const response = await queryClient.fetchQuery({
      queryKey: [queryKey.delAccount],
      queryFn: () => instance.delete(url.accAction),
    })
    auth.removeUserData()
    response.isDeleted && console.log('isDeleted')
    return redirect('/')
  } else {
    await queryClient.fetchQuery({
      queryKey: [queryKey.account],
      queryFn: () => instance.put(url.accAction, formData),
    })
    return null
  }
}
