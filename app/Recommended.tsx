import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import fetchProperties from '@/utils/fetchProperties'

export default async function Recommended() {
  const data = await fetchProperties()
  const recentProperties: DBPropertyListing[] = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3)

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {!recentProperties ? (
              <p>No properties available</p>
            ) : (
              recentProperties.map((property) => {
                return <PropertyCard key={property._id} property={property} />
              })
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-sm my-10 px-6">
        <Link
          href="/properties"
          className="block bg-gray-800 text-white text-center py-4 px-6 rounded-xl hover:bg-gray-600"
        >
          View All Properties
        </Link>
      </section>
    </>
  )
}
