const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const TARGETS = [
  { url: 'http://localhost:3001', file: 'deckforge.jpg' },
  { url: 'http://localhost:3002', file: 'watchmatch.jpg' },
  { url: 'http://127.0.0.1:5000', file: 'cipher.jpg' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (const { url, file } of TARGETS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      const out = path.join(OUT, file);
      await page.screenshot({
        path: out,
        type: 'jpeg',
        quality: 97,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      });
      const size = fs.statSync(out).size;
      console.log(`Saved: ${out} (${(size / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error('Error for', url, e.message);
    }
    await page.close();
  }
  await browser.close();
  console.log('Done');
})();
