import fs from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const slideIds = [
  "legal-demo-slide-wait",
  "legal-demo-slide-title",
  "legal-demo-slide-solutions",
  "legal-demo-slide-public-website",
  "legal-demo-slide-case-status",
  "legal-demo-slide-justice-clock",
  "legal-demo-slide-appointments",
  "legal-demo-slide-lawyer-dashboard",
  "legal-demo-slide-shared-notes",
  "legal-demo-slide-admin",
  "legal-demo-slide-attendance",
  "legal-demo-slide-reminders",
  "legal-demo-slide-benefits",
  "legal-demo-slide-final",
] as const;

async function jumpToSlide(page: Page, index: number) {
  await page.evaluate((slideIndex) => {
    const story = document.querySelector<HTMLElement>("[data-testid='legal-main-scroll-story']");
    if (!story) {
      return;
    }

    story.scrollTo({ top: story.clientHeight * slideIndex, behavior: "auto" });
    story.dispatchEvent(new Event("scroll"));
  }, index);

  await page.waitForTimeout(900);
}

const screenshotWaitBySlide: Record<number, number> = {
  4: 1800,
  6: 1800,
  8: 2100,
  9: 1500,
  10: 4300,
  11: 4100,
};

test.describe("legal workplace main deck", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1536, height: 1024 });
    await page.goto("/");
    await expect(page.getByTestId("legal-main-scroll-story")).toBeVisible();
  });

  test("uses the reduced 14-slide flow without presenter notes UI", async ({ page }) => {
    await expect(page.locator("section")).toHaveCount(14);
    await jumpToSlide(page, 4);
    await expect(page.getByTestId("legal-demo-slide-case-status")).toBeVisible();
    await expect(page.getByTestId("presenter-notes-overlay")).toHaveCount(0);
  });

  test("captures the 14-slide demo flow", async ({ page }) => {
    const outDir =
      "/Users/tanikatech/Documents/Playground/test/test-results/legal-workplace-main/1536x1024";
    await fs.mkdir(outDir, { recursive: true });

    for (let index = 0; index < slideIds.length; index += 1) {
      await jumpToSlide(page, index);
      const extraWait = screenshotWaitBySlide[index];
      if (extraWait) {
        await page.waitForTimeout(extraWait);
      }
      await expect(page.getByTestId(slideIds[index])).toBeVisible();

      await page.screenshot({
        path: path.join(outDir, `${String(index + 1).padStart(2, "0")}-${slideIds[index]}.png`),
        animations: "allow",
        caret: "hide",
      });
    }
  });
});
