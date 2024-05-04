import connectDB from '@/config/database'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

export const GET = async (request: Request) => {
  try {
    await connectDB()

    // Get user
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('User ID is required.', { status: 401 })
    }
    const { id: userId } = sessionUser
    const user = await User.findOne({ _id: userId })

    // Fetch bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } })
    return new Response(JSON.stringify(bookmarks), { status: 200 })
  } catch (error) {
    return new Response('Something went wrong', { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    await connectDB()

    // Get user
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('User ID is required.', { status: 401 })
    }
    const { id: userId } = sessionUser
    const user = await User.findOne({ _id: userId })

    // Update array of bookmarks
    const { propertyId } = await request.json()
    let isBookmarked = user.bookmarks.includes(propertyId)
    let message
    if (isBookmarked) {
      user.bookmarks.pull(propertyId)
      message = 'Bookmark removed successfully'
      isBookmarked = false
    } else {
      user.bookmarks.push(propertyId)
      message = 'Bookmark added successfully'
      isBookmarked = true
    }
    await user.save()
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    })
  } catch (error) {
    return new Response('Something went wrong', { status: 500 })
  }
}
