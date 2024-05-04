import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return null
    }

    return session.user
  } catch (error) {
    return null
  }
}
