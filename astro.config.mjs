import { defineConfig } from 'astro/config';

// Static output, no islands, CSS inlined into the document. One request for the
// page, one per font, and nothing else leaves the machine.
export default defineConfig({
  site: 'https://www.cargopete.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  markdown: {
    // Two themes, neither of them the default: Shiki then emits every token
    // colour as --shiki-light / --shiki-dark rather than one hard inline
    // colour, which is what global.css switches on. With a single theme the
    // dark toggle would leave light-theme token colours on a near-black ground.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
