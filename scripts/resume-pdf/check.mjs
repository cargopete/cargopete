// Fails if the committed PDF has drifted from src/data/resume.ts: every
// company, role, date, bullet, scope item and project name must appear in its
// text. Fix a failure with `yatr resume-pdf`, never by editing the PDF.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { resume } from '../../src/data/resume.ts';

const file = fileURLToPath(new URL('../../public/resume/petko-pavlovski-resume.pdf', import.meta.url));

const doc = await getDocument({ data: new Uint8Array(await readFile(file)), verbosity: 0 }).promise;
let text = '';
for (let i = 1; i <= doc.numPages; i++) {
  const content = await (await doc.getPage(i)).getTextContent();
  text += content.items.map((item) => item.str).join(' ') + ' ';
}

// Line wrapping inserts spaces and splits hyphenated words ("third-" / "party"),
// so compare with all whitespace removed. NFKC folds any ligatures back.
const squash = (s) => s.normalize('NFKC').replace(/\s+/g, '');
const haystack = squash(text);

const expected = [
  ...resume.jobs.flatMap((j) => [j.company, j.role, j.org, j.from, j.to, j.where, ...j.points]),
  ...resume.scope.in,
  ...resume.scope.out,
  ...[...resume.openSource.building, ...resume.openSource.shipped].flatMap((p) => p.names),
].filter(Boolean);

for (const s of expected) {
  if (!haystack.includes(squash(s))) {
    console.error(`resume-pdf check: the committed PDF is missing "${s}"`);
    console.error('src/data/resume.ts has changed since the PDF was built. Run `yatr resume-pdf` and commit both.');
    process.exit(1);
  }
}
console.log(`resume-pdf check: all ${expected.length} strings from src/data/resume.ts are in ${doc.numPages === 1 ? 'the one-page' : `the ${doc.numPages}-page`} PDF`);
