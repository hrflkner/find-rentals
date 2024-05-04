import PropertyCard from '../../components/PropertyCard'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import fetchProperties from '@/utils/fetchProperties'
import PropertySearchForm from '../PropertySearchForm'

export default async function PropertiesPage() {
  const properties: DBPropertyListing[] = await fetchProperties()
  properties.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  return (
    <>
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
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
    </>
  )
}
