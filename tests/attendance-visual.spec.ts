import fs from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const slides = [
  { index: 0, key: "01-trust", testId: "attendance-slide-hero" },
  { index: 1, key: "02-challenge", testId: "attendance-slide-transition" },
  { index: 2, key: "03-balance", testId: "attendance-slide-balance" },
  { index: 3, key: "04-platforms", testId: "attendance-slide-platforms" },
  { index: 4, key: "05-workflow", testId: "attendance-slide-workflow" },
  { index: 5, key: "06-auto-punch", testId: "attendance-slide-trigger" },
  { index: 6, key: "07-privacy", testId: "attendance-slide-privacy" },
  { index: 7, key: "08-admin", testId: "attendance-slide-admin" },
  { index: 8, key: "09-benefits", testId: "attendance-slide-benefits" },
  { index: 9, key: "10-culture", testId: "attendance-slide-culture" },
] as const;

const viewports = [
  { name: "1536x1024", width: 1536, height: 1024 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
] as const;

async function jumpToSlide(page: Page, index: number) {
  await page.evaluate((slideIndex) => {
    const story = document.querySelector<HTMLElement>("[data-testid='attendance-scroll-story']");
    if (!story) {
      return;
    }

    story.scrollTo({ top: story.clientHeight * slideIndex, behavior: "auto" });
    story.dispatchEvent(new Event("scroll"));
  }, index);

  await page.waitForTimeout(950);
}

async function captureDeck(page: Page, outputDir: string) {
  await fs.mkdir(outputDir, { recursive: true });

  for (const slide of slides) {
    await jumpToSlide(page, slide.index);
    await expect(page.getByTestId(slide.testId)).toBeVisible();

    await page.screenshot({
      path: path.join(outputDir, `${slide.key}.png`),
      animations: "allow",
      caret: "hide",
      scale: "device",
    });
  }
}

for (const viewport of viewports) {
  test(`attendance deck visual pass at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/attendence");
    await expect(page.getByTestId("attendance-scroll-story")).toBeVisible();
    await page.waitForTimeout(900);

    await captureDeck(page, path.join("test-results", "attendance-visual", viewport.name, "motion"));
  });
}

test("attendance deck reduced motion pass", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/attendence");
  await expect(page.getByTestId("attendance-scroll-story")).toBeVisible();
  await page.waitForTimeout(350);

  await captureDeck(page, path.join("test-results", "attendance-visual", "1536x1024", "reduced-motion"));
});
