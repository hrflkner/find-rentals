import Image from 'next/image'

type Props = {
  images: string[]
}

function PropertyGallery({ images }: Props) {
  return (
    <div className="container mx-auto">
      {images.length === 1 ? (
        <Image
          src={images[0]}
          alt="Property image"
          className="object-cover h-[70svh] md:h-[80svh] w-auto mx-auto rounded-xl"
          width={1800}
          height={600}
          priority
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`${
                images.length === 3 && idx === 2 ? 'col-span-2' : 'col-span-1'
              }`}
            >
              <Image
                src={image}
                alt={`Property image ${idx + 1}`}
                className="object-cover h-[70svh] md:h-[80svh] w-full mx-auto rounded-xl"
                width={1800}
                height={600}
                priority
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertyGallery
