import { chromium } from "playwright";
const browser=await chromium.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
for(const width of [1440,1024,768,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
  await page.goto("http://127.0.0.1:4321/o-nas");
  const map=page.locator(".regional-map");
  await map.scrollIntoViewIfNeeded();
  const state=await map.evaluate(el=>{const img=el;const r=img.getBoundingClientRect();const section=img.closest(".ab-region").getBoundingClientRect();return{loaded:img.complete&&img.naturalWidth>0,natural:[img.naturalWidth,img.naturalHeight],rect:[r.x,r.y,r.width,r.height],inside:r.left>=section.left&&r.right<=section.right+0.5,src:img.getAttribute("src"),alt:img.getAttribute("alt"),objectFit:getComputedStyle(img).objectFit}});
  const layout=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  await page.locator(".ab-region").screenshot({path:`.codex-artifacts/regional-map-${width}.png`});
  console.log(JSON.stringify({width,state,layout,errors}));
  await page.close();
}
await browser.close();
