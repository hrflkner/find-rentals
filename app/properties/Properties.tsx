'use client'

import Spinner from '@/components/Spinner'
import PropertyCard from '../../components/PropertyCard'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import { useEffect, useState } from 'react'
import PropertyPagination from './PropertyPagination'

export default function Properties() {
  const [properties, setProperties] = useState<DBPropertyListing[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [propertyCount, setPropertyCount] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        )

        if (!res.ok) {
          throw new Error('Failed to fetch properties.')
        }

        const data = await res.json()

        //properties.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        setProperties(data.properties)
        setPropertyCount(data.propertyCount)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [page, pageSize])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {!properties.length ? (
          <p>No properties available!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => {
              return <PropertyCard key={property._id} property={property} />
            })}
          </div>
        )}
        <PropertyPagination
          page={page}
          pageSize={pageSize}
          propertyCount={propertyCount}
          setPage={setPage}
        />
      </div>
    </section>
  )
}
