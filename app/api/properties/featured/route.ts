import connectDB from '@/config/database'
import Property from '@/models/Property'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const properties = await Property.find({ is_featured: true })

    return new Response(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong!', {
      status: 500,
    })
  }
}
