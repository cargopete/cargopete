import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { portfolio } from '../src/data/portfolio.ts';

const font = (await readFile(new URL('../public/fonts/space-grotesk.woff2', import.meta.url))).toString('base64');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><style>
    @font-face { font-family: Space; src: url(data:font/woff2;base64,${font}); }
    * { box-sizing: border-box; } body { margin: 0; padding: 60px 72px; width: 1200px; height: 630px; background: #171614; color: #ece9e3; font-family: Space, 'Noto Color Emoji', sans-serif; }
    .top { display:flex; justify-content:space-between; color:#d0704f; font-size:23px; padding-bottom:26px; border-bottom:1px solid #3b3832; }
    .role { color:#9c978c; font-size:24px; margin:58px 0 18px; } h1 { font-size:76px; line-height:1.05; letter-spacing:-3px; margin:0; font-weight:600; }
    h1 span { color:#d0704f; } .sub { color:#ece9e3; font-size:30px; margin:28px 0 0; letter-spacing:-0.5px; } .bottom { display:flex; justify-content:space-between; color:#9c978c; font-size:22px; margin-top:48px; padding-top:24px; border-top:1px solid #3b3832; }
  </style><div class="top"><span>Petko (Pete) Pavlovski</span><span>cargopete.com</span></div><p class="role">${portfolio.role}</p><h1>making ai agents<br><span>accessible to humans ❤️</span></h1><p class="sub">I write the part that has to stay up.</p><div class="bottom"><span>kitbag / nuthatch / Matchstick / Graphcast</span><span>Sofia · remote</span></div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL('../public/social-card.png', import.meta.url).pathname });
  console.log('Wrote public/social-card.png (1200 × 630).');
} finally {
  await browser.close();
}
