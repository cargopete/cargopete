import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://www.cargopete.com';

// Hand-rolled rather than @astrojs/rss. The feed is thirty lines and the site
// has exactly two dependencies; adding a third to emit this much XML is a poor
// trade. If the feed ever needs enclosures or full content, revisit that.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const items = posts.map((p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${SITE}/blog/${p.id}/</link>
      <guid isPermaLink="true">${SITE}/blog/${p.id}/</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${esc(p.data.description)}</description>
${p.data.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Petko (Pete) Pavlovski</title>
    <link>${SITE}/blog/</link>
    <description>Notes from building indexers, languages and developer tooling in Rust.</description>
    <language>en-gb</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
