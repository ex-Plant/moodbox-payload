import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type IsAdminT = (args: AccessArgs<User>) => boolean

export const isAdmin: IsAdminT = ({ req: { user } }) => {
  return user?.role === 'admin'
}
