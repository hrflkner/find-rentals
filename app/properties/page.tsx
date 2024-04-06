import Link from 'next/link'
import React from 'react'

type Props = {}

export default function PropertiesPage({}: Props) {
  return (
    <div>
      <h1 className="text-3xl">Available properties</h1>
      <Link href="/">Back Home</Link>
    </div>
  )
}
