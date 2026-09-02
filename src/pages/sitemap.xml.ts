import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://www.cargopete.com';

// Generated, not hand-written. The old public/sitemap.xml listed the homepage
// and nothing else, and would have gone stale the moment a post was added.
const STATIC: Array<[string, string]> = [
  ['/', '1.0'],
  ['/blog/', '0.9'],
  ['/resume/', '0.8'],
];

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const urls = [
    ...STATIC.map(([path, priority]) =>
      `  <url><loc>${SITE}${path}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`),
    ...posts.map((p) =>
      `  <url><loc>${SITE}/blog/${p.id}/</loc><lastmod>${p.data.date.toISOString().slice(0, 10)}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>`),
  ].join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
