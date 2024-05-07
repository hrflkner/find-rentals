import Image from 'next/image'
import PropertySearchForm from './PropertySearchForm'

export default function Hero() {
  return (
    <section className="relative bg-black py-20 md:py-48 lg:py-96 w-full max-h-[60svh] h-[50svh] lg:max-h-none md:h-auto aspect-auto overflow-hidden">
      <Image
        className="absolute top-0 min-w-max w-auto lg:w-full max-h-[85svh] mx-auto"
        src="/images/sunset_suburb.avif"
        alt="Neighborhood at sunset"
        width={3840}
        height={1596}
        priority
      />
      <div className="absolute z-10 top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 w-full max-w-[85%] lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 lg:py-16 lg:ml-[10%] rounded-xl lg:bg-black/75 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
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
