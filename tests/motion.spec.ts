import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`motion settles and preserves interactions at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('.portfolio-motion')).toHaveAttribute('data-motion', 'on');
    const title = page.locator('#hero-title');
    await expect.poll(() => title.evaluate(element => getComputedStyle(element).opacity)).toBe('1');
    await expect(title).toBeVisible();
    await page.locator('.actions a[href="#work"]').click();
    await expect(page).toHaveURL(/#work$/);
    const firstProject = page.locator('#project-01');
    await firstProject.locator('.case-study summary').click();
    await expect.poll(() => firstProject.locator('.case-study-body').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
    await firstProject.getByRole('button', { name: 'Next build stage' }).click();
    await expect(firstProject.locator('.step-detail')).toContainText('Node.js + Express');
    await expect.poll(() => firstProject.locator('.step-detail').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
    const skill = page.locator('.skill-card').first();
    await skill.scrollIntoViewIfNeeded();
    await expect(skill).toHaveAttribute('style', /opacity/);
    await expect.poll(() => skill.evaluate(element => getComputedStyle(element).opacity)).toBe('1');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('reduced motion leaves content unanimated', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.portfolio-motion')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('#hero-title')).not.toHaveAttribute('style', /opacity|transform/);
  const skill = page.locator('.skill-card').first();
  await skill.scrollIntoViewIfNeeded();
  await expect(skill).not.toHaveAttribute('style', /opacity|transform/);
  await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test('changing motion preference stops and clears entrance animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.locator('.portfolio-motion')).toHaveAttribute('data-motion', 'on');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.portfolio-motion')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('#hero-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('#hero-title')).toHaveCSS('transform', 'none');
  await expect(page.locator('#hero-title')).toBeVisible();
});

test('content and native case studies remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.locator('#project-01 .case-study summary').click();
    await expect(page.locator('#project-01 .case-study-story')).toBeVisible();
    await expect(page.locator('#project-01 .case-study-story')).toContainText('THE PROBLEM');
  } finally {
    await context.close();
  }
});
