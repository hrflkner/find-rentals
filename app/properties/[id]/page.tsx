import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: Props) {
  return <div>PropertyPage {params.id}</div>
}
