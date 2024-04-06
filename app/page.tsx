import Link from 'next/link'
import React from 'react'

type Props = {}

export default function HomePage({}: Props) {
  return (
    <div>
      <h1 className="text-3xl">Welcome</h1>
      <Link href="/properties">Show Properties</Link>
    </div>
  )
}
