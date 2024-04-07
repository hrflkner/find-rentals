import mongoose from 'mongoose'

let connected = false

export default async function connectDB() {
  mongoose.set('strictQuery', true)

  // If te db is already connected, don't reconnect
  if (connected) {
    console.log('MongoDB is already connected')
    return
  }

  // Connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    connected = true
    console.log('connected')
  } catch (error) {
    console.error(error)
  }
}
