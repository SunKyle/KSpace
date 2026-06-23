export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kspace.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kyle",
    url: siteUrl,
    sameAs: [
      "https://github.com/kyle-sun",
      "https://twitter.com/kyle_sun",
    ],
    jobTitle: "全栈开发工程师",
    knowsAbout: [
      "Web Development",
      "Full Stack Engineering",
      "Artificial Intelligence",
      "React",
      "Next.js",
      "TypeScript",
      "Java",
      "Python",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KSpace",
    url: siteUrl,
    description: "一个全栈开发者的个人技术空间——思考、构建、分享。",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "博客",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "项目",
        item: `${siteUrl}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
