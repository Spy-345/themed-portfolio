import {test,expect} from '@playwright/test';
// Motion must be enabled: the decorative drone canvas is absent in reduced-motion mode.
test.use({reducedMotion:'no-preference'});
for(const width of [390,1440]){
 test(`hero links remain clickable beneath drone animation at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  await page.goto('/',{waitUntil:'networkidle'});
  await expect(page.locator('.hero-patrol canvas')).toBeVisible();
  await page.locator('.actions a[href="#work"]').click({timeout:5000});
  await expect(page).toHaveURL(/#work$/);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await expect(page.locator('.hero-patrol canvas')).toBeVisible();
  await page.locator('.actions a[href="#contact"]').click({timeout:5000});
  await expect(page).toHaveURL(/#contact$/);
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.getByRole('button',{name:'▷ Build',exact:true}).click();
  await expect(page.getByRole('button',{name:'▷ Build',exact:true})).toHaveAttribute('aria-pressed','true');
 });
}
