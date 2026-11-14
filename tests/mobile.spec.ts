import {test,expect} from '@playwright/test';
for(const width of [320,375,390,768,1024]){
 test(`responsive layout at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});
  await page.goto('/',{waitUntil:'networkidle'});
  await expect(page.locator('.flip-name')).toHaveAttribute('aria-label','Shivam Yewle');
  await expect(page.getByRole('heading',{level:1})).toContainText('Developer.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  for(const name of ['work','about','experience','contact']){
   await page.locator(`#${name}`).scrollIntoViewIfNeeded();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
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
