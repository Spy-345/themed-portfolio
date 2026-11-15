import {test,expect} from '@playwright/test';
for(const width of [320,390,768,1440]){
 test(`service page works at ${width}px`,async({page,request})=>{
  await page.setViewportSize({width,height:900});await page.goto('/services',{waitUntil:'networkidle'});
  await expect(page.getByRole('heading',{level:1})).toContainText('Good ideas deserve');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  for(const id of ['business-websites','graphic-design','video-editing','mobile-apps']){
   const card=page.locator(`#${id}`);await card.scrollIntoViewIfNeeded();await expect(card.locator('img')).toBeVisible();await expect.poll(()=>card.locator('img').evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBeTruthy();
   await card.getByRole('link',{name:'Explore demo concept'}).click();await expect(page).toHaveURL(new RegExp(`#demo-${id}$`));
   await expect(page.locator(`#demo-${id}`)).toBeVisible();
   await expect(card.getByRole('link',{name:'Discuss this service'})).toHaveAttribute('href',/^mailto:yewleshivam\.p@gmail\.com\?subject=/);
  }
  if(width<=960){await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.locator('.mobile-nav summary').click();await page.locator('.mobile-nav nav a[href="/#contact"]').click();await expect(page).toHaveURL(/\/#contact$/)}
  else{await page.locator('.desktop-nav a[href="/#work"]').click();await expect(page).toHaveURL(/\/#work$/)}
  const xml=await (await request.get('/sitemap.xml')).text();expect(xml).toContain('<loc>https://spyy.xyz/services</loc>');
 });
}
test('services route has its own search identity',async({request})=>{
 const html=await (await request.get('/services')).text();expect(html).toContain('rel="canonical" href="https://spyy.xyz/services"');expect(html).toContain('"@type":"CollectionPage"');expect(html).not.toContain('"@type":"ProfilePage"');
});
test('homepage services overview opens the dedicated listing',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/',{waitUntil:'networkidle'});
 await page.locator('.services-overview').scrollIntoViewIfNeeded();await expect(page.locator('.service-preview')).toHaveCount(4);
 await page.locator('.services-overview').getByRole('link',{name:'Explore all services'}).click();await expect(page).toHaveURL(/\/services$/);await expect(page.getByRole('heading',{level:1})).toContainText('Good ideas deserve');
});
