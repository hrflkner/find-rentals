'use client'
import { useState, useEffect } from 'react'
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import { toast } from 'react-toastify'

export default function BookmarkedPropertiesPage() {
  const [properties, setProperties] = useState<DBPropertyListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const fetchBookmarks = async () => {
        const res = await fetch('/api/bookmarks')
        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        } else {
          toast.error('Failed to fetch bookmarks.')
        }
      }
      fetchBookmarks()
    } catch (error) {
      toast.error('Failed to fetch bookmarks.')
    } finally {
      setLoading(false)
    }
  }, [])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="container-xl lg:container mx-auto py-6">
      <h1 className="text-4xl">Your bookmarks</h1>
      <div className="px-4 py-6">
        {!properties.length ? (
          <p>No properties available!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => {
              return <PropertyCard key={property._id} property={property} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}
