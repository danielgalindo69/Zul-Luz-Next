const fallbackSiteUrl = 'https://www.zulluz.shop'

function resolveSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl
  try {
    return new URL(candidate).origin
  } catch {
    return fallbackSiteUrl
  }
}

export const SITE_URL = resolveSiteUrl()

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString()
}
