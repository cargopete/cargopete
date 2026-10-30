import { defineConfig } from 'astro/config';

// Static output, no islands, CSS inlined into the document. One request for the
// page, one per font, and nothing else leaves the machine.
export default defineConfig({
  site: 'https://www.cargopete.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  markdown: {
    // Built from the brick tokens, since every stock theme spends blue.
    shikiConfig: {
      theme: {
        name: 'brick',
        type: 'dark',
        colors: { 'editor.background': '#1b1a17', 'editor.foreground': '#ece9e3' },
        tokenColors: [
          { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#9c978c', fontStyle: 'italic' } },
          { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new'], settings: { foreground: '#d0704f' } },
          { scope: ['string', 'string.quoted', 'markup.inline.raw'], settings: { foreground: '#86b592' } },
          { scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: '#cdb06a' } },
          { scope: ['entity.name.function', 'support.function', 'entity.name.type', 'support.type', 'entity.name.class'], settings: { foreground: '#f2cbbb' } },
          { scope: ['variable', 'punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#ece9e3' } },
        ],
      },
    },
  },
});
