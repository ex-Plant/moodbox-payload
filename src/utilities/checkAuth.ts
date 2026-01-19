import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import type { PayloadRequest } from 'payload'

export async function checkAuth(): Promise<boolean> {
  let isAuthenticated = false

  try {
    const payload = await getPayload({ config: configPromise })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (token) {
      // Try to authenticate with the token
      const user = await payload.auth({
        req: {
          headers: new Headers({ authorization: `JWT ${token}` }),
        } as PayloadRequest,
        headers: new Headers(),
      })

      isAuthenticated = !!user
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    isAuthenticated = false
  }

  return isAuthenticated
}
