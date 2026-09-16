import { chromium } from "playwright";
const browser=await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
for(const width of [1440,1024,768,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
  await page.goto("http://127.0.0.1:4321/o-nas");
  const layout=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  const nav=await page.getByRole("link",{name:"O nas",exact:true}).first().getAttribute("aria-current");
  const sections=await page.locator("main section").count();
  const photos=await page.locator('img:not(.brand img):not(.footer-logo img)').count();
  await page.screenshot({path:`.codex-artifacts/about-${width}.png`,fullPage:true});
  console.log(JSON.stringify({width,layout,nav,sections,photos,errors}));
  await page.close();
}
const home=await browser.newPage();
await home.goto("http://127.0.0.1:4321/");
await home.locator("#homepage-nav").getByRole("link",{name:"O nas"}).click();
console.log(JSON.stringify({homeMenuPath:new URL(home.url()).pathname}));
await home.close();
await browser.close();
