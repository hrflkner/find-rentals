import { Timestamp } from 'mongodb'
import DBPropertyListing from './DBPropertyListing'
import { DBUser } from './DBUser'

export interface DBMessage {
  _id: string
  sender: DBUser
  recipient: string
  property: DBPropertyListing
  name: string
  email: string
  phone: string
  body: string
  read: boolean
  createdAt: Timestamp
}
