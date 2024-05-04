'use client'

import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import Message from './Message'
import { DBMessage } from '@/interfaces/DBMessage'

type Props = {}

export default function Messages({}: Props) {
  const [messages, setMessages] = useState<DBMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages')

        if (res.status === 200) {
          const data = await res.json()
          setMessages(data)
        }
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getMessages()
  }, [])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-black">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-black px-6 py-8 mb-4 m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Enquiries</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You don't have any messages.</p>
            ) : (
              messages.map((message, idx: number) => (
                <Message key={idx} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
