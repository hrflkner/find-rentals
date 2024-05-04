import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/properties/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const property = await Property.findById(params.id)

    if (!property) {
      return new Response('Property not found!', {
        status: 404,
      })
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong!', {
      status: 500,
    })
  }
}

// PUT /api/properties/:id
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('Unauthorized. User ID is required', { status: 401 })
    }
    const { id: userId } = sessionUser

    await connectDB()
    const { id: propertyId } = params
    const existingProperty = await Property.findById(propertyId)

    if (!existingProperty) {
      return new Response('Property does not exist.', { status: 404 })
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response(
        'Unauthorized. Only the account owner can edit their properties.',
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const amenities = formData.getAll('amenities')

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData
    )

    return new Response(JSON.stringify(updatedProperty), { status: 200 })
  } catch (error) {
    // console.error(error)
    return new Response('Failed to add property', { status: 500 })
  }
}

// DELETE /api/properties/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sessionUser = await getSessionUser()
    if (!sessionUser || !sessionUser.id) {
      return new Response('User ID is required', { status: 401 })
    }
    const { id: userId } = sessionUser

    await connectDB()
    const propertyId = params.id
    const property = await Property.findById(propertyId)
    if (!property) {
      return new Response('Property not found!', {
        status: 404,
      })
    }

    if (property.owner.toString() !== userId) {
      return new Response(
        'Unauthorized. Only the account owner can delete their properties.',
        { status: 401 }
      )
    }

    await property.deleteOne()

    return new Response('Property deleted', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('Something went wrong!', {
      status: 500,
    })
  }
}
