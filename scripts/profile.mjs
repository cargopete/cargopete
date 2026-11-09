import { readFile, writeFile } from 'node:fs/promises';
import { resume } from '../src/data/resume.ts';
import { portfolio } from '../src/data/portfolio.ts';

const { contact } = resume;
const profile = `# ${resume.name}

${portfolio.role} · Sofia, Bulgaria · remote since 2019.

${portfolio.headline} ${portfolio.summary}

[Portfolio](https://www.cargopete.com/) · [CV](https://www.cargopete.com/resume/) · [Download PDF](https://www.cargopete.com/resume/petko-pavlovski-resume.pdf) · [LinkedIn](${contact.linkedinUrl}) · [${contact.email}](mailto:${contact.email})

## Now

${portfolio.current}

## Selected work

${portfolio.selected.map(p => `### ${p.name} | ${p.label}

${p.contribution} ${p.result}

${p.links.map(l => `[${l.label}](${l.href})`).join(' · ')}`).join('\n\n')}

## Also building

${portfolio.building.map(p => `- [${p.name}](${p.href}): ${p.text} [Source](${p.source}).`).join('\n')}

More operator tools in [The Night’s Watch](https://github.com/nuthatch-org), and protocol explainers at [Learn The Graph](https://learn-thegraph.com).

## Experience

| Company | Role | When |
| --- | --- | --- |
${resume.jobs.map(j => `| ${j.company}${j.org ? ` / ${j.org}` : ''} | ${j.role} | ${j.from} - ${j.to} |`).join('\n')}

${resume.accountant}

## Get in touch

${portfolio.contact} Remote from Sofia, with European working hours and some US overlap.

[${contact.email}](mailto:${contact.email}) · [Full experience & CV](https://www.cargopete.com/resume/)

---

This repository also builds [cargopete.com](https://www.cargopete.com/) with Astro. [Development, publishing and content guide](docs/DEVELOPMENT.md).
`;

const file = new URL('../README.md', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(file, 'utf8') !== profile) {
    console.error('Profile README is out of date. Run npm run profile.');
    process.exit(1);
  }
  console.log('Profile README matches the portfolio and resume data.');
} else {
  await writeFile(file, profile);
  console.log('Wrote README.md from portfolio and resume data.');
}
