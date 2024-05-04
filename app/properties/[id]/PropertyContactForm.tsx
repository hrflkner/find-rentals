'use client'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { FaPaperPlane } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

type Props = {
  property: DBPropertyListing
}

export default function PropertyContactForm({ property }: Props) {
  const { data: session } = useSession()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const message = (await res.json())!.message
      if (res.status === 200) {
        toast.success(message)
      } else if (res.status === 400 || res.status === 401) {
        toast.error(message)
      } else {
        toast.error('Something went wrong. Please try again later.')
      }
      setSubmitted(message || '')
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    }
  }

  return (
    <div className="bg-black p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p>You need to log in before sending a message.</p>
      ) : submitted ? (
        <p className="mb-4">{submitted}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-gray-500 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
