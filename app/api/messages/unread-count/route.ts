import connectDB from '@/config/database'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSessionUser'

export const GET = async (request: Request) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response(
        JSON.stringify({ message: 'You must log in to send a message.' }),
        { status: 401 }
      )
    }
    const { id: userId } = sessionUser

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    })

    return new Response(JSON.stringify(count), {
      status: 200,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong. Please try again later.',
      }),
      { status: 500 }
    )
  }
}
