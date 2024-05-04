'use client'

import DBPropertyListing from '@/interfaces/DBPropertyListing'
import { useSession } from 'next-auth/react'
import { Id, toast } from 'react-toastify'
import { FaBookmark } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'

type Props = {
  property: DBPropertyListing
}

export default function BookmarkButton({ property }: Props) {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  const toastId = useRef<Id | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'applications/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        })

        if (res.status === 200) {
          const data = await res.json()
          setIsBookmarked(data.isBookmarked)
        }
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }

    checkBookmarkStatus()
  }, [property._id, userId])

  const handleClick = async () => {
    if (!userId) {
      toast.error('Sign in to bookmark properties')
      return
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'applications/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      })

      if (toastId.current) toast.dismiss(toastId.current)
      if (res.status === 200) {
        const data = await res.json()
        setIsBookmarked(data.isBookmarked)
        toastId.current = toast.success(data.message)
      }
    } catch (error) {
      // console.error(error)
      toastId.current = toast.error('Something went wrong.')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  )
}
