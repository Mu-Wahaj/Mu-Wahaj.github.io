import { Helmet } from 'react-helmet-async'

type SeoProps = {
  title: string
  description: string
  path?: string
  jsonLd?: Record<string, unknown>
}

const site = 'https://mu-wahaj.github.io'

export const Seo = ({ title, description, path = '/', jsonLd }: SeoProps) => {
  const url = `${site}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  )
}
