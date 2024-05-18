import { redirect } from 'react-router-dom'
import { auth } from '../../services'

export const cabinetLoader = ({ request }) => {
  const check = auth.check(request)

  if (check !== null) {
    return redirect('/login?' + check)
  }

  return null
}
