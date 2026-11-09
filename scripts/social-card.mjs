import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { portfolio } from '../src/data/portfolio.ts';

const font = (await readFile(new URL('../public/fonts/space-grotesk.woff2', import.meta.url))).toString('base64');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><style>
    @font-face { font-family: Space; src: url(data:font/woff2;base64,${font}); }
    * { box-sizing: border-box; } body { margin: 0; padding: 60px 72px; width: 1200px; height: 630px; background: #171614; color: #ece9e3; font-family: Space, sans-serif; }
    .top { display:flex; justify-content:space-between; color:#d0704f; font-size:23px; padding-bottom:26px; border-bottom:1px solid #3b3832; }
    .role { color:#9c978c; font-size:24px; margin:38px 0 16px; } h1 { font-size:76px; line-height:1.05; letter-spacing:-3px; margin:0; font-weight:600; }
    h1 span { color:#d0704f; } .bottom { display:flex; justify-content:space-between; color:#9c978c; font-size:22px; margin-top:38px; padding-top:24px; border-top:1px solid #3b3832; }
  </style><div class="top"><span>Petko (Pete) Pavlovski</span><span>cargopete.com</span></div><p class="role">${portfolio.role}</p><h1>I write the part<br>that has to <span>stay up.</span></h1><div class="bottom"><span>Matchstick / nuthatch / Graphcast</span><span>Sofia · remote</span></div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL('../public/social-card.png', import.meta.url).pathname });
  console.log('Wrote public/social-card.png (1200 × 630).');
} finally {
  await browser.close();
}
