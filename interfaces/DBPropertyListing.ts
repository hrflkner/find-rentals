import PropertyListing from './PropertyListing'

export default interface DBPropertyListing extends PropertyListing {
  _id: string
  // isFeatured: boolean
  createdAt: string
  updatedAt: string
  images: string[]
}
