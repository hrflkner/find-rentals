import React from 'react'
import '@/assets/styles/globals.css'

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
    <html lang="en">
      <body className="bg-black text-white">
        <div>{children}</div>
      </body>
    </html>
  )
}