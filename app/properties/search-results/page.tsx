'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '@/components/PropertyCard'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import Spinner from '@/components/Spinner'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import PropertySearchForm from '@/app/PropertySearchForm'

type Props = {}

export default function SearchResultsPage({}: Props) {
  const searchParams = useSearchParams()

  const [properties, setProperties] = useState<DBPropertyListing[]>([])
  const [loading, setLoading] = useState(true)

  const location = searchParams.get('location')
  const propertyType = searchParams.get('propertyType')

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        )

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        } else {
          setProperties([])
        }
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [location, propertyType])

  return (
    <>
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="container-xl lg:container mx-auto py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> All properties
          </Link>
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
      )}
    </>
  )
}
