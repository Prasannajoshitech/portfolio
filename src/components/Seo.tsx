import { Helmet } from "react-helmet-async";
import { siteConfig } from "../data/site";

type Breadcrumb = { name: string; path: string };

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags?: string[];
  };
  breadcrumbs?: Breadcrumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export default function Seo({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noIndex = false,
  article,
  breadcrumbs,
  jsonLd,
}: SeoProps) {
  const pageTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.title;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image}`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    image: `${siteConfig.url}/og.jpg`,
    email: siteConfig.email,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
    knowsAbout: [...siteConfig.knowsAbout],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { "@type": "Person", name: siteConfig.name },
  };

  const breadcrumbJsonLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
        })),
      }
    : null;

  const extra = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`${siteConfig.name} — ${siteConfig.role}`}
      />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {article ? (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          {article.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      ) : null}

      {path === "/" ? (
        <>
          <script type="application/ld+json">
            {JSON.stringify(personJsonLd)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteJsonLd)}
          </script>
        </>
      ) : null}
      {breadcrumbJsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      ) : null}
      {extra.map((item, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
