import { defineConfig } from 'astro/config';

// Static output, no islands, CSS inlined into the document. One request for the
// page, one per font, and nothing else leaves the machine.
export default defineConfig({
  site: 'https://www.cargopete.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
