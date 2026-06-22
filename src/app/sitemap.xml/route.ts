import { posts } from "@/lib/velite";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kspace.dev";

  const pages = ["", "/about", "/blog", "/projects", "/lab"];
  const blogPages = posts
    .filter((p) => !p.draft)
    .map((p) => p.path);

  const allPages = [...pages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (path) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${path === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
