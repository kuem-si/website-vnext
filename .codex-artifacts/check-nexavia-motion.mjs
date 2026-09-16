import { chromium } from "playwright";
const browser = await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
for (const reduce of [false,true]) {
  const page = await browser.newPage({viewport:{width:1440,height:900},reducedMotion:reduce?"reduce":"no-preference"});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto("http://127.0.0.1:4321/nexavia");
  await page.locator(".nx-integrations").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const first=await page.locator(".nx-moving-squares rect").first().evaluate(el=>el.getBoundingClientRect().x);
  await page.waitForTimeout(1200);
  const second=await page.locator(".nx-moving-squares rect").first().evaluate(el=>el.getBoundingClientRect().x);
  const animated=await page.locator(".nx-integrations").evaluate(el=>el.classList.contains("is-animated"));
  console.log(JSON.stringify({reduce,first,second,animated,errors}));
  await page.close();
}
await browser.close();
