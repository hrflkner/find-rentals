import connectDB from '@/config/database'
import Property from '@/models/Property'

// GET /api/properties
export async function GET(request: Request) {
  try {
    await connectDB()

    const properties = await Property.find({})

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
