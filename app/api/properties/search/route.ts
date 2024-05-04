import connectDB from '@/config/database'
import Property from '@/models/Property'

export const GET = async (request: Request) => {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const propertyType = searchParams.get('propertyType')

    let query = {}
    if (location) {
      const locationPattern = new RegExp(location, 'i')
      query = {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          { 'location.street': locationPattern },
          { 'location.city': locationPattern },
          { 'location.state': locationPattern },
          { 'location.zipcode': locationPattern },
        ],
      }
    }

    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i')
      query = { ...query, type: typePattern }
    }

    const properties = await Property.find(query)

    return new Response(JSON.stringify(properties), { status: 200 })
  } catch (error) {
    // console.error
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
