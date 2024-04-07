import PropertyCard from '../../components/PropertyCard'
import PropertyListing from '@/interfaces/PropertyListing'
import fetchProperties from '@/utils/fetchProperties'

export default async function PropertiesPage() {
  const properties: PropertyListing[] = await fetchProperties()
  properties.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  return (
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
      </div>
    </section>
  )
}
