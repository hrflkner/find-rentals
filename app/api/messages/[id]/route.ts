import connectDB from '@/config/database'
import Message from '@/models/Message'
import { getSessionUser } from '@/utils/getSessionUser'

interface Params {
  params: {
    id: string
  }
}

export const PUT = async (request: Request, { params }: Params) => {
  try {
    await connectDB()

    const { id } = params

    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('Unauthorized.', { status: 401 })
    }
    const { id: userId } = sessionUser

    const message = await Message.findById(id)
    if (!message) {
      return new Response('Message not found.', { status: 404 })
    }

    if (message.recipient.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    message.read = !message.read

    await message.save()

    return new Response(JSON.stringify(message), { status: 200 })
  } catch (error) {
    // console.error(error)
    new Response('Something went wrong.', { status: 500 })
  }
}

export const DELETE = async (request: Request, { params }: Params) => {
  try {
    await connectDB()

    const { id } = params

    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('Unauthorized.', { status: 401 })
    }
    const { id: userId } = sessionUser

    const message = await Message.findById(id)
    if (!message) {
      return new Response('Message not found.', { status: 404 })
    }

    if (message.recipient.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    await message.deleteOne()

    return new Response('Message deleted successfully!', { status: 200 })
  } catch (error) {
    // console.error(error)
    new Response('Something went wrong.', { status: 500 })
  }
}
