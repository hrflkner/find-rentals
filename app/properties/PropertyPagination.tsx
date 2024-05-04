import { Dispatch, SetStateAction } from 'react'

type Props = {
  page: number
  pageSize: number
  propertyCount: number
  setPage: Dispatch<SetStateAction<number>>
}

export default function PropertyPagination({
  page,
  pageSize,
  propertyCount,
  setPage,
}: Props) {
  const totalPages = Math.ceil(propertyCount / pageSize)

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => setPage((prev) => (prev === 0 ? prev : prev - 1))}
        className="mr-2 px-2 py-1 border border-gray-500 disabled:border-gray-600 disabled:text-gray-600 rounded"
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          setPage((prev) => (prev === totalPages ? prev : prev + 1))
        }
        className="ml-2 px-2 py-1 border border-gray-500 disabled:border-gray-600 disabled:text-gray-600 rounded"
        disabled={page >= totalPages}
      >
        Next
      </button>
    </section>
  )
}
