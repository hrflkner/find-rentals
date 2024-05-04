import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from '@/models/User'
import connectDB from '@/config/database'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }: any) {
      await connectDB()
      const userExists = await User.findOne({ email: profile.email })

      if (!userExists) {
        const username = profile.name.slice(0, 20)

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        })
      }

      return true
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user!.email })

      let sessionUser = { ...session.user, id: user._id.toString()! as string }

      return { ...session, user: sessionUser }
    },
  },
}
