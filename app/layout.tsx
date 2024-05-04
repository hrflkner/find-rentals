import React from 'react'
import '@/assets/styles/globals.css'
import NavBar from './NavBar'
import Footer from './Footer'
import AuthProvider from './AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MessageProvider } from '@/context/MessageContext'

type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: 'Faulkner Properties | Find the Perfect Rental',
  description: 'Find your dream rental property!',
  keywords: 'rental, find rentals, homes, apartments, condos, studios',
}

export default function layout({ children }: Props) {
  return (
    <AuthProvider>
      <MessageProvider>
        <html lang="en">
          <body className="relative min-h-[100svh] pb-28 bg-black text-white">
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ToastContainer theme="dark" />
          </body>
        </html>
      </MessageProvider>
    </AuthProvider>
  )
}
