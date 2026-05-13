import { test, expect } from '@playwright/test';

async function jumpToSlide(page, index) {
  const story = page.locator('.story-container');
  await story.evaluate((element, slideIndex) => {
    const container = element as HTMLElement;
    container.scrollTo({ top: container.clientHeight * (slideIndex as number), behavior: 'auto' });
    container.dispatchEvent(new Event('scroll'));
  }, index);
  await page.waitForTimeout(500);
}

test('case status, appointment, and lawyer dashboard polish', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto('http://127.0.0.1:4174/');

  await jumpToSlide(page, 4);
  await expect(page.getByTestId('legal-demo-slide-case-status')).toBeVisible();
  await expect(page.locator('[data-testid^="case-status-phone-message-"]')).toHaveCount(1);
  await page.waitForTimeout(3200);
  await expect(page.locator('[data-testid^="case-status-phone-message-"]')).toHaveCount(2);
  await page.waitForTimeout(6200);
  await expect(page.locator('[data-testid^="case-status-phone-message-"]')).toHaveCount(4);

  await jumpToSlide(page, 6);
  await expect(page.getByTestId('legal-demo-slide-appointments')).toBeVisible();
  await expect(page.locator('[data-testid^="appointment-phone-message-"]')).toHaveCount(1);
  await page.waitForTimeout(3200);
  await expect(page.locator('[data-testid^="appointment-phone-message-"]')).toHaveCount(2);

  await jumpToSlide(page, 7);
  await expect(page.getByTestId('legal-demo-slide-lawyer-dashboard')).toBeVisible();
  await expect(page.getByText('Live Case Images')).toBeVisible();
  await page.screenshot({ path: '/private/tmp/legal-ui-smoke-lawyer-dashboard.png', animations: 'allow', caret: 'hide' });
});
