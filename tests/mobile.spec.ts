import {test,expect} from '@playwright/test';
for(const width of [320,375,390,768,1024]){
 test(`responsive layout at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});
  await page.goto('/',{waitUntil:'networkidle'});
  await expect(page.locator('.hero-copy')).toContainText('Shivam');
  await expect(page.getByRole('heading',{level:1})).toContainText('Shivam Yewle');
  await expect(page.getByRole('heading',{level:1})).toContainText('Full Stack Developer');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  for(const name of ['work','skills','about','experience','contact']){
   await page.locator(`#${name}`).scrollIntoViewIfNeeded();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  for (const summary of await page.locator('.case-study summary').all()) {
   await summary.click();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await expect(page.locator('.site-capture img').first()).toBeVisible();
  expect(await page.locator('.site-capture img').first().evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBeTruthy();
  if(width<=760){
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.locator('.mobile-nav summary').click();
   await expect(page.locator('.mobile-nav nav')).toBeVisible();
   await page.locator('.mobile-nav nav a[href="#contact"]').click();
   await expect(page).toHaveURL(/#contact$/);
  }
  const resume=await page.request.get('/resume/shivam-yewle-resume.pdf');expect(resume.ok()).toBeTruthy();
 });
}
