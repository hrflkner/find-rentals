export default interface PropertyListing {
  owner?: string
  name: string
  type: string
  description: string
  location: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  beds?: number
  baths?: number
  square_feet?: number
  amenities: string[]
  rates: {
    nightly?: number
    weekly?: number
    monthly?: number
  }
  seller_info: {
    name: string
    email: string
    phone: string
  }
  images: (string | File)[]
}
