import PropertySearchForm from '../PropertySearchForm'
import Properties from './Properties'

export default function PropertiesPage() {
  return (
    <>
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  )
}
