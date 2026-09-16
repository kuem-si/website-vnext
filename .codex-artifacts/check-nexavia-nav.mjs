import { chromium } from "playwright";
const browser = await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto("http://127.0.0.1:4321/");
  if (width===390) await page.locator(".hp-menu").click();
  const link=page.locator("#homepage-nav").getByRole("link",{name:"Nexavia",exact:true});
  const href=await link.getAttribute("href");
  await link.click();
  console.log(JSON.stringify({width,href,path:new URL(page.url()).pathname,title:await page.locator("h1").first().textContent()}));
  await page.close();
}
await browser.close();
