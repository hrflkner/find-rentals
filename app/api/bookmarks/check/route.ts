import connectDB from '@/config/database'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'

export const POST = async (request: Request) => {
  try {
    await connectDB()

    const { propertyId } = await request.json()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.id) {
      return new Response('User ID is required.', { status: 401 })
    }

    const { id: userId } = sessionUser

    const user = await User.findOne({ _id: userId })

    let isBookmarked = user.bookmarks.includes(propertyId)

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    })
  } catch (error) {
    // console.error(error)
    return new Response('Something went wrong', { status: 500 })
  }
}
