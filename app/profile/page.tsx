'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import profileDefault from '@/assets/images/profile.png'
import { useEffect, useState } from 'react'
import DBPropertyListing from '@/interfaces/DBPropertyListing'
import Spinner from '@/components/Spinner'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const { data: session } = useSession()
  const profileName = session?.user?.name
  const profileEmail = session?.user?.email
  const profileImage = session?.user?.image

  const [properties, setProperties] = useState<DBPropertyListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) {
        return
      }

      try {
        const res = await fetch(`/api/properties/user/${userId}`)

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        }
      } catch (error) {
        // console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user?.id) {
      fetchUserProperties(session.user.id)
    }
  }, [session])

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property? This action can't be undone!"
    )

    if (!confirmed) {
      return
    }

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      })
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        )
        setProperties(updatedProperties)

        toast.success('Property deleted')
      } else {
        toast.error('Unauthorized to delete property.')
      }
    } catch (error) {
      toast.error('Failed to delete property.')
      // console.error(error)
    }
  }

  return (
    <section className="bg-black">
      <div className="container m-auto py-12">
        <div className="bg-black px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row gap-20 px:4 sm:px-10 pt-12">
            <div className="md:w-1/4">
              <div className="mb-4">
                <Image
                  className="h-20 w-20 md:h-24 md:w-24 rounded-xl mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-md mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-md">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {loading && <Spinner loading={loading} />}
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {!loading &&
                properties.length > 0 &&
                properties.map((property: DBPropertyListing, idx: number) => (
                  <div key={idx} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <div className="relative h-96">
                        <Image
                          className="w-full rounded-md object-cover"
                          src={property?.images[0] as string}
                          alt={`Image of ${property.name}`}
                          fill
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <p className="text-gray-600">
                          {property.location?.street} {property.location?.city},{' '}
                          {property.location?.state}
                        </p>
                      </div>
                    </Link>
                    <div className="mt-2">
                      <a
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
