'use client'

import { Session } from 'next-auth'
import { useEffect } from 'react'
import { useMessageContext } from '@/context/MessageContext'

interface Props {
  session: Session
}

export default function UnreadMessages({ session }: Props) {
  const { unreadCount, setUnreadCount } = useMessageContext()

  useEffect(() => {
    if (!session) return

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/messages/unread-count')

        if (res.status === 200) {
          const data = await res.json()
          setUnreadCount(data)
        }
      } catch (error) {
        // console.error(error)
      }
    }

    fetchUnreadCount()
  }, [session, setUnreadCount])
  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  )
}