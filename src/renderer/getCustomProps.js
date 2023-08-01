export function getCustomProps(pageContext) {
  const { config, urlPathname } = pageContext

  // canonicalPaths
  const base = `https://${import.meta.env.VITE_DOMAIN}`
  const url = new URL(urlPathname.replace(/\/$/, ''), base)
  const absolute = url.href
  const relative = url.pathname
  const canonicalPaths = {
    base,
    absolute,
    relative
  }

  const documentProps = Object.assign(
    {},
    config.documentProps || {},
    pageContext.documentProps || {}
  )

  return { canonicalPaths, documentProps }
}
