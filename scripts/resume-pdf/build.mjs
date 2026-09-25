// Fills template.html from src/data/resume.ts and prints it to
// public/resume/petko-pavlovski-resume.pdf. Run locally (`yatr resume-pdf`)
// and commit the result: Vercel serves the file and never runs a browser.
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { resume } from '../../src/data/resume.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));
const out = join(root, 'public/resume/petko-pavlovski-resume.pdf');

// Local date, so the footer matches the day it was run where it was run.
const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
  .map((n) => String(n).padStart(2, '0')).join('-');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const font = (pkg, file) => pathToFileURL(join(root, 'node_modules/@fontsource', pkg, 'files', file)).href;
const items = (list) => list.map((s) => `<li>${esc(s)}</li>`).join('');

const job = (j) => `
    <div class="rail mono"><div>${esc(j.from)}</div><div class="to">${esc(j.to)}</div></div><div class="spine tick"></div>
    <div class="body job">
      <div class="job-head"><span><b>${esc(j.company)}</b> <span class="role">${esc(j.role)}${j.org ? ` · ${esc(j.org)}` : ''}</span></span><span class="where mono">${esc(j.where)}</span></div>
      <ul>${items(j.points)}</ul>
    </div>`;

const project = (p) => `
        <p class="project">${p.names.map((n) => `<b>${esc(n)}</b>`).join(' and ')} — ${esc(p.text)} <span class="meta mono">${esc(p.meta)}</span></p>`;

const { contact, history, openSource, scope, footing, pdf } = resume;
const fields = {
  title: resume.page.title,
  name: resume.name,
  'tagline.lead': resume.tagline[0],
  'tagline.rest': resume.tagline[1],
  'contact.email': contact.email,
  'contact.site': contact.site,
  'contact.github': contact.github,
  'contact.linkedin': contact.linkedin,
  'contact.location': contact.location,
  intro: `${resume.intro} ${resume.tenure} ${resume.accountant}`,
  'history.heading': history.heading,
  'history.lede': history.lede,
  'footing.figure': footing.figure,
  'footing.text': footing.text,
  'openSource.heading': openSource.heading,
  'scope.heading': scope.heading,
  'scope.inLabel': scope.inLabel,
  'scope.outLabel': scope.outLabel,
  'pdf.canonical': pdf.canonical,
  'pdf.generated': pdf.generated,
  'pdf.drift': pdf.drift,
  date,
};
const markup = {
  'font.sans400': font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff2'),
  'font.sans600': font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff2'),
  'font.mono400': font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2'),
  'font.mono600': font('ibm-plex-mono', 'ibm-plex-mono-latin-600-normal.woff2'),
  jobs: resume.jobs.map(job).join(''),
  'openSource.building': openSource.building.map(project).join(''),
  'openSource.shipped': openSource.shipped.map(project).join(''),
  'scope.in': items(scope.in),
  'scope.out': items(scope.out),
};

const template = await readFile(fileURLToPath(new URL('template.html', import.meta.url)), 'utf8');
const html = template.replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
  if (key in markup) return markup[key];
  if (key in fields) return esc(fields[key]);
  throw new Error(`template.html asks for {{${key}}}, which build.mjs does not supply`);
});

// Loaded from a file rather than setContent so the file:// font URLs resolve.
const dir = await mkdtemp(join(tmpdir(), 'resume-pdf-'));
const page = join(dir, 'resume.html');
await writeFile(page, html);

const browser = await chromium.launch();
let raw;
try {
  const tab = await browser.newPage();
  await tab.goto(pathToFileURL(page).href, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  raw = await tab.pdf({ format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
} finally {
  await browser.close();
  await rm(dir, { recursive: true, force: true });
}

const doc = await PDFDocument.load(raw);
if (doc.getPageCount() !== 1) {
  console.error(`resume-pdf: ${doc.getPageCount()} pages, expected exactly 1. Tighten the data or the template.`);
  process.exit(1);
}
// Chromium stamps the wall-clock time; pinning both dates to the generation day
// keeps two runs on the same day byte-identical.
const day = new Date(`${date}T00:00:00Z`);
doc.setTitle(resume.page.title);
doc.setAuthor(resume.name);
doc.setCreator('cargopete.com scripts/resume-pdf');
doc.setProducer('Chromium via Playwright, pdf-lib');
doc.setCreationDate(day);
doc.setModificationDate(day);
const bytes = await doc.save({ useObjectStreams: false });
await writeFile(out, bytes);
console.log(`resume-pdf: wrote ${out.slice(root.length)} (${bytes.length} bytes, 1 page, ${date})`);
