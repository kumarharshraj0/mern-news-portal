import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, article }) => {
  const siteName = "ZIVEK Intelligence";
  const defaultDescription = "Premium investigative journalism and global intelligence for the modern era.";
  
  const seo = {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || defaultDescription,
    image: image || "/logo-social.png",
    url: window.location.href,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;
