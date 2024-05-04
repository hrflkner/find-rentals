import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

type Props = {
  images: string[]
}

function PropertyGallery({ images }: Props) {
  return (
    <Gallery>
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Item
            original={images[0]}
            thumbnail={images[0]}
            width={1000}
            height={600}
          >
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                src={images[0]}
                alt="Property image"
                className="object-cover h-[70svh] md:h-[80svh] w-auto mx-auto rounded-xl"
                width={1000}
                height={600}
                priority
              />
            )}
          </Item>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`${
                  images.length === 3 && idx === 2 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <Item
                  original={image}
                  thumbnail={image}
                  width={1000}
                  height={600}
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={image}
                      alt={`Property image ${idx + 1}`}
                      className="object-cover h-[70svh] md:h-[80svh] w-full mx-auto rounded-xl"
                      width={1800}
                      height={600}
                      priority
                    />
                  )}
                </Item>
              </div>
            ))}
          </div>
        )}
      </div>
    </Gallery>
  )
}

export default PropertyGallery
