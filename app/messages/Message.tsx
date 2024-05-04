import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { DBMessage } from '@/interfaces/DBMessage'
import { useMessageContext } from '@/context/MessageContext'

type Props = {
  message: DBMessage
}

export default function Message({ message }: Props) {
  const [isRead, setIsRead] = useState(message.read)
  const [isDeleted, setIsDeleted] = useState(false)
  const { setUnreadCount } = useMessageContext()

  const handleMarkRead = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      })

      if (res.status === 200) {
        const { read } = await res.json()
        setIsRead(read)
        setUnreadCount((prev) => (read ? prev - 1 : prev + 1))
        toast.success(read ? 'Marked as Read' : 'Marked as New')
      }
    } catch (error) {
      toast.error('Something we wrong. Please try again.')
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      })

      if (res.status === 200) {
        toast.success('Message deleted!')
        setIsDeleted(true)
        if (isRead) {
          setUnreadCount((prev) => prev - 1)
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return isDeleted ? null : (
    <div className="relative bg-gray-800 p-4 rounded-md shadow-md border border-gray-800">
      {!isRead && (
        <div className="absolute top-2 right-2 border border-red-500 text-red-500 px-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property:</span>{' '}
        <Link
          href={`/properties/${message.property._id}`}
          className="text-blue-400 underline underline-offset-2"
        >
          {message.property.name}
        </Link>
      </h2>
      <p className="text-gray-300">{message.body}</p>

      <ul className="mt-4">
        <li>
          <span className="text-gray-400">Name:</span> {message.name}
          {' - '}
          {message.sender.username}
        </li>

        <li>
          <span className="text-gray-400">Reply Email:</span>{' '}
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <span className="text-gray-400">Reply Phone:</span>{' '}
          <Link href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <span className="text-gray-400">Received:</span>{' '}
          <span>{new Date(message.createdAt.toString()).toLocaleString()}</span>
        </li>
      </ul>
      <button
        onClick={handleMarkRead}
        className={`mt-4 mr-3 text-white py-1 px-3 rounded-md ${
          isRead ? 'bg-gray-600' : 'bg-blue-700'
        }`}
      >
        {isRead ? 'Mark as New' : 'Mark as Read'}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  )
}
