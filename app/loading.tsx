'use client'
import { HashLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '100px auto',
}

export default function LoadingPage(loading: boolean) {
  return (
    <HashLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}
