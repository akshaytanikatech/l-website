import { expect, test, type Page } from "@playwright/test";

async function jumpToSlide(page: Page, index: number) {
  await page.evaluate((slideIndex) => {
    const story = document.querySelector<HTMLElement>("[data-testid='attendance-scroll-story']");
    if (!story) {
      return;
    }

    story.scrollTo({ top: story.clientHeight * slideIndex, behavior: "auto" });
    story.dispatchEvent(new Event("scroll"));
  }, index);
  await page.waitForTimeout(200);
}

test.describe("PulseFlow attendance presentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/attendence");
  });

  test("auto-punch toggle changes the UI color", async ({ page }) => {
    await jumpToSlide(page, 5);

    const toggle = page.getByTestId("auto-punch-toggle");
    const before = await toggle.evaluate((element) => getComputedStyle(element).backgroundColor);

    await toggle.click();

    await expect(toggle).toHaveAttribute("data-state", "off");
    const after = await toggle.evaluate((element) => getComputedStyle(element).backgroundColor);

    expect(after).not.toBe(before);
  });

  test("delete screenshot modal opens from the timeline", async ({ page }) => {
    await jumpToSlide(page, 6);

    await page.getByTestId("timeline-slot-0").hover();
    await page.getByTestId("delete-screenshot-trigger-0").click();

    await expect(page.getByTestId("delete-screenshot-modal")).toBeVisible();
  });

  test("scroll snap does not skip feature slides", async ({ page }) => {
    const story = page.getByTestId("attendance-scroll-story");
    await story.hover();

    const height = await story.evaluate((element) => element.clientHeight);

    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(850);
    const afterFirst = await story.evaluate((element) => element.scrollTop);

    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(850);
    const afterSecond = await story.evaluate((element) => element.scrollTop);

    expect(Math.abs(afterFirst - height)).toBeLessThanOrEqual(8);
    expect(Math.abs(afterSecond - height * 2)).toBeLessThanOrEqual(8);
  });
});
