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

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // ascending order
      .populate('sender', 'username')
      .populate('property', 'name')

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // ascending order
      .populate('sender', 'username')
      .populate('property', 'name')

    const messages = [...unreadMessages, ...readMessages]

    return new Response(JSON.stringify(messages), { status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong. Please try again later.',
      }),
      { status: 500 }
    )
  }
}

export const POST = async (request: Request) => {
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

    const { name, email, phone, message, property, recipient } =
      await request.json()
    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: 'You can not send a message to yourself!' }),
        { status: 400 }
      )
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    })
    await newMessage.save()

    return new Response(
      JSON.stringify({ message: 'Your message has been sent!' }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong. Please try again later.',
      }),
      { status: 500 }
    )
  }
}
