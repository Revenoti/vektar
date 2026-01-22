import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'Vektar - AI Solutions That Deliver Real ROI',
  description = 'Build Real ROI from AI. Vektar designs, builds, and scales AI systems that convert more leads, cut drudge-work, and unlock insights—without risking your data.',
  canonical = 'https://vektar.io/',
  type = 'website',
  image = 'https://vektar.io/og-image.png'
}) => {
  const fullTitle = title.includes('Vektar') ? title : `${title} | Vektar AI Solutions`
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
