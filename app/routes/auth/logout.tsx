import { redirect } from 'remix'
import { logout } from '~/utils/session.server'

export const action = async (request: Request) => {
  return logout(request as any)
}

export const loader = async () => {
  return redirect('/')
}

// export default function Logout() {
//   return (
//     <div>You've been logged out</div>
//   )
// }