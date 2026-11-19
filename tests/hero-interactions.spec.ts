import {test,expect} from '@playwright/test';
for(const width of [390,1440]){
 test(`portfolio navigation and project walkthrough work at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  await page.goto('/',{waitUntil:'networkidle'});
  await page.locator('.actions a[href="#work"]').click();
  await expect(page).toHaveURL(/#work$/);
  const project=page.locator('#project-01');
  await project.locator('.case-study summary').click();
  await expect(project.locator('.case-study-body')).toBeVisible();
  const journey=project.locator('.journey');
  await journey.getByRole('button',{name:'Next build stage'}).click();
  await expect(journey.getByRole('button',{name:'Compose'})).toHaveAttribute('aria-pressed','true');
  await expect(journey.locator('.step-detail')).toContainText('Node.js + Express');
  await journey.getByRole('button',{name:'Deliver'}).click();
  await expect(journey.locator('.flow-result')).toContainText('Structured research content');
  await expect(page.locator('.contact-panel a[download]')).toHaveAttribute('href','/resume/shivam-yewle-resume.pdf');
 });
}
