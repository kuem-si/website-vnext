import { chromium } from "playwright";
const browser=await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
for(const reduce of [false,true]){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:reduce?"reduce":"no-preference"});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  await page.goto("http://127.0.0.1:4321/o-nas");
  const moving=page.locator(".ab-moving rect");
  const first=await moving.evaluate(el=>el.getBoundingClientRect().x);
  await page.waitForTimeout(1000);
  const second=await moving.evaluate(el=>el.getBoundingClientRect().x);
  console.log(JSON.stringify({reduce,first,second,animated:await page.locator(".ab-hero-graphic").evaluate(el=>el.classList.contains("is-animated")),errors}));
  await page.close();
}
await browser.close();
