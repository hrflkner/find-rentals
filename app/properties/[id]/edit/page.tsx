import PropertyEditForm from './PropertyEditForm'

interface Props {
  params: {
    id: string
  }
}

export default function page({ params }: Props) {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-black px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  )
}
