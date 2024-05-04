import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import cloudinary from '@/config/cloudinary'

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

export async function POST(request: Request) {
  try {
    await connectDB()
    const user = await getSessionUser()

    if (!user || !user.id) {
      return new Response('Unauthorized. User ID is required.', { status: 401 })
    }

    const formData = await request.formData()

    const amenities = formData.getAll('amenities')
    const images = formData
      .getAll('images')
      .filter((image) => (image as File).name !== '')

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
      owner: user.id,
      images,
    }

    const imageUploadPromises = images.map(async (image) => {
      const imageBuffer = await (image as File).arrayBuffer()
      const imageArray = Array.from(new Uint8Array(imageBuffer))
      const imageData = Buffer.from(imageArray)

      const imageBase64 = imageData.toString('base64')

      return cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'faulknerproperties',
        }
      )
    })
    const uploadedImages = await Promise.all(imageUploadPromises)
    propertyData.images = uploadedImages.map((res) => res.secure_url)

    const newProperty = new Property(propertyData)
    await newProperty.save()

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    )
    //return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })
  } catch (error) {
    return new Response('Failed to add property', { status: 500 })
  }
}
