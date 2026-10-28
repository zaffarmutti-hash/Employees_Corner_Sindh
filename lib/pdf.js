import puppeteer from 'puppeteer-core';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

function findChromePath() {
  const paths = [
    // Windows common locations
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    process.env.PROGRAMFILES + '\\Google\\Chrome\\Application\\chrome.exe',
    // Linux / Serverless locations
    process.env.CHROME_BIN,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser'
  ].filter(Boolean);

  for (const p of paths) {
    if (existsSync(p)) return p;
  }
  return null;
}

export async function generatePdfFromHtml(bodyHtml, customCss = null) {
  const executablePath = findChromePath();
  if (!executablePath) {
    throw new Error('No compatible Chrome/Edge browser found on the server for PDF rendering.');
  }

  let css = customCss;
  if (!css) {
    try {
      const cssPath = path.join(process.cwd(), 'styles', 'tr22.css');
      css = await readFile(cssPath, 'utf8');
    } catch {
      css = '';
    }
  }

  const fullHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Form T.R.22 Arrears Pay Bill</title>
  <style>
    ${css}
    @page { size: A4 portrait; margin: 0; }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      width: 210mm !important;
    }
    .sheet {
      margin: 0 !important;
      box-shadow: none !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      overflow: hidden !important;
    }
    .sheet:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
    }
  </style>
</head>
<body style="background:#fff;margin:0;padding:0;">
  ${bodyHtml}
</body>
</html>`;

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
      '--font-render-hinting=medium'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'load' });
    await page.emulateMediaType('print');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

