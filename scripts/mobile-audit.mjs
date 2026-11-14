import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const dir='artifacts/mobile-audit';await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true});const results=[];
for(const width of [320,375,390,768,1024]){
 const context=await browser.newContext({viewport:{width,height:844},isMobile:width<768,hasTouch:width<768,reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.PLAYWRIGHT_BASE_URL||'https://spyy.xyz',{waitUntil:'networkidle'});
 await page.screenshot({path:`${dir}/${width}-hero.png`});
 const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1&&!e.closest('.robot-companion,.eve-scanner,.cursor-light')}).slice(0,20).map(e=>({tag:e.tagName,class:e.className?.toString().slice(0,100),right:e.getBoundingClientRect().right})),smallTargets:[...document.querySelectorAll('a,button,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.width<24||r.height<24)}).map(e=>({label:e.getAttribute('aria-label')||e.textContent?.trim().slice(0,45),width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height)}))}));
 if(width===390){for(const [name,selector] of [['projects','.project'],['tools','.skills'],['contact','#contact'],['footer','.footer-workshop:not(.tools-workshop)']]){await page.locator(selector).first().scrollIntoViewIfNeeded();await page.locator(selector).first().screenshot({path:`${dir}/390-${name}.png`})}}
 let menuStaysOpen=null;if(width<768){await page.evaluate(()=>scrollTo(0,0));await page.locator('.mobile-nav summary').click();await page.screenshot({path:`${dir}/${width}-menu.png`});await page.locator('.mobile-nav nav a[href="#contact"]').click();menuStaysOpen=await page.locator('.mobile-nav').evaluate(e=>e.hasAttribute('open'))}
 results.push({width,metrics,menuStaysOpen,errors});await context.close();
}
await browser.close();await writeFile(`${dir}/report.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
