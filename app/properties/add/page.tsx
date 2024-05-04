import React from 'react'
import PropertyAddForm from './PropertyAddForm'

type Props = {}

export default function AddPropertyPage({}: Props) {
  return (
    <section className="bg-gray-900">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-black px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  )
}
