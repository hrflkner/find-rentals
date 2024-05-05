import Image from 'next/image'
import PropertySearchForm from './PropertySearchForm'

export default function Hero() {
  return (
    <section className="relative bg-black/25 py-20 md:py-48 lg:py-80 w-full max-h-[60svh] lg:max-h-none md:h-auto aspect-auto overflow-hidden">
      <Image
        className="absolute top-0 min-w-max w-auto lg:w-full max-h-[75svh] lg:max-h-none lg:h-full mx-auto"
        src="/images/sunset_suburb.avif"
        alt="Neighborhood at sunset"
        width={3840}
        height={1596}
        priority
      />
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Your Next Home or Rental
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  )
}
