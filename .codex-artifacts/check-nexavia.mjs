import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const width of [1440, 1024, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4321/nexavia");
  await page.screenshot({path: `.codex-artifacts/nexavia-${width}-playwright.png`, fullPage: true});
  await page.locator(".nx-integrations").screenshot({path: `.codex-artifacts/nexavia-integration-${width}.png`});
  const before = await page.evaluate(() => ({innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  for (const role of ["Operativa", "IT in skrbniki", "Vodstvo"]) {
    await page.getByRole("tab", {name: role}).click();
    if ((await page.getByRole("tab", {name: role}).getAttribute("aria-selected")) !== "true") errors.push(`Tab ${role} inactive`);
  }
  const menu = await page.locator(".menu-toggle").evaluate(el => ({display:getComputedStyle(el).display,rect:el.getBoundingClientRect().toJSON()}));
  if (width <= 768) {
    await page.locator(".menu-toggle").click();
    if (await page.locator(".menu-toggle").getAttribute("aria-expanded") !== "true") errors.push("Mobile menu did not open");
  }
  if (await page.getByRole("link", {name: /Oglejte si platformo/}).getAttribute("href") !== "#vloge") errors.push("Platform anchor missing");
  console.log(JSON.stringify({width,before,menu,errors}));
  await page.close();
}
await browser.close();
