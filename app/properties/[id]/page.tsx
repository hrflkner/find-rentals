'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import fetchProperty from '@/utils/fetchProperty'
import PropertyHeaderImage from './PropertyHeaderImage'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import Link from 'next/link'
import PropertyDetails from './PropertyDetails'
import { FaArrowLeft } from 'react-icons/fa'
import Spinner from '@/components/Spinner'
import PropertyGallery from './PropertyGallery'
import BookmarkButton from './BookmarkButton'
import ShareButtons from './ShareButtons'
import PropertyContactForm from './PropertyContactForm'

export default function PropertyPage() {
  const [property, setProperty] = useState<DBPropertyListing | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return

      try {
        const property = await fetchProperty(id as string)
        setProperty(property)
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (!property) {
      fetchPropertyData()
    }
  }, [id, property])

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-14">
        Property not found...
      </h1>
    )
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-black">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* Sidebar */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm />
                </aside>
              </div>
            </div>
          </section>
          <section className="px-4">
            <PropertyGallery images={property.images} />
          </section>
        </>
      )}
    </>
  )
}
