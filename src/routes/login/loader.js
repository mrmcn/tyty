import { redirect } from 'react-router-dom'
import { auth } from '../../services'

export const loginLoader = () => {
  if (auth.check() === null) return redirect('/')
  return null
}
