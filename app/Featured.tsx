import fetchProperties from '@/utils/fetchProperties'
import React from 'react'
import FeaturedCard from './FeaturedCard'
import DBPropertyListing from '@/interfaces/DBPropertyListing'

type Props = {}

export default async function Featured({}: Props) {
  const featuredProperties: DBPropertyListing[] = await fetchProperties({
    showFeatured: true,
  })
  return (
    featuredProperties.length > 0 && (
      <section className="bg-gray-900 px-4 pt-10 pb-20">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProperties.map((property, idx: number) => (
              <FeaturedCard key={idx} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  )
}
