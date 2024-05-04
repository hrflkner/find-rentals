const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

export default async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle when domain is unavailable from prod env
    if (!apiDomain) {
      return []
    }
    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data.')
    }

    return res.json()
  } catch (err) {
    console.error(err)
    return []
  }
}
