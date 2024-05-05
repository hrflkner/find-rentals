import Link from 'next/link'
import React from 'react'

type Props = {
  heading: string
  backgroundColor?: string
  textColor?: string
  buttonInfo: {
    link: string
    text: string
    backgroundColor: string
  }
  children: React.ReactNode
}

export default function InfoBox({
  heading,
  backgroundColor = 'bg-gray-700',
  textColor = 'text-white',
  buttonInfo,
  children,
}: Props) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={buttonInfo.link}
        className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
}
