import { expect, test, type Locator, type Page } from "@playwright/test";

const slideThreeScript = `Let me begin with the legal platform. Iska main purpose hai to create a smarter and more organized digital system for legal operations. [Small pause]

In a legal environment, time, accuracy, confidentiality, and accountability are very important. Lawyers need quick access to case details. Admin teams need proper control. Clients and citizens need transparency. And the institution needs a system that reduces confusion and delays.

This platform is designed around three main areas: public website access, lawyer dashboard, and admin dashboard. [Speak slowly]

As the larger discussion around Why Bharat Matters reminds us, Indian institutions need systems designed for Indian scale, Indian complexity, and Indian users. So the goal is not just to make a website.

The goal is to create faster access, better transparency, and smoother legal operations. [Pause and look at audience]`;

const slideFourScript = `First, let us talk about the public website. The public website works like the main entrance of the legal system. Matlab, when someone comes to the website, they should quickly understand where to go and what to do. [Small pause]

When someone visits the website, they should not feel confused. They should immediately know where to search, what service to use, and how to access the information they need.

The website can include important sections like Home, About Court, Judges, Case Status, Appointments, Judgments, Notices, Lawyer Login, and Admin Login. It can also include a language change option for English, Hindi, and Marathi, so users can choose the language they are comfortable with. This gives the website a formal and professional legal-sector feel.

The platform should also feel connected to Indian legal and institutional realities, not like a copied template. This connects naturally with the broader idea in India that is Bharat.

For example, if a client or citizen wants to check case status, they should not have to call multiple people or visit the office again and again. They can simply go to the website and use the case status option.

If someone wants to see judges' information, sitting judges, bench details, or court assignments, they can access it in a structured way. If someone wants to book an appointment, they can do it directly through the website.

So, the website becomes one official platform for important legal access. Yeh system confusion kam karega and will make access easier. [Pause and look at audience]`;

async function jumpToSlide(page: Page, index: number) {
  const story = page.locator(".story-container");

  await story.evaluate((element, slideIndex) => {
    const container = element as HTMLElement;
    container.scrollTo({ top: container.clientHeight * (slideIndex as number), behavior: "auto" });
    container.dispatchEvent(new Event("scroll"));
  }, index);

  await page.waitForTimeout(450);
}

async function readScript(block: Locator) {
  return (await block.innerText()).replace(/\r\n/g, "\n").trim();
}

async function expectReadableText(locator: Locator, minBrightness = 150) {
  const color = await locator.evaluate((element) => {
    const value = window.getComputedStyle(element).color;
    const matches = value.match(/[\d.]+/g) ?? [];
    return matches.slice(0, 3).map((part) => Number(part));
  });

  expect(color).toHaveLength(3);

  const [rawRed, rawGreen, rawBlue] = color;
  const [red, green, blue] =
    rawRed <= 1 && rawGreen <= 1 && rawBlue <= 1
      ? [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel * 255))
      : [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel));

  const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
  expect(brightness).toBeGreaterThan(minBrightness);
}

test.describe("Legal platform slides 3 and 4", () => {
  test("desktop presentation shows legal platform intro, public website portal, and Shift practice mode", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await jumpToSlide(page, 2);

    await expect(page.getByTestId("legal-slide-3")).toContainText("Part 1: Legal Platform");
    await expect(page.getByRole("heading", { name: "Smarter Legal Operations" })).toBeVisible();
    await expect(page.getByTestId("legal-slide-3-footer")).toHaveText(
      "Public Website • Lawyer Dashboard • Admin Dashboard"
    );
    await expect(page.locator("[data-testid^='legal-slide-3-panel-']")).toHaveCount(3);
    await expect(page.getByTestId("speaker-script-3")).toHaveCount(0);
    await expectReadableText(page.getByTestId("legal-slide-3-kicker"), 175);
    await expectReadableText(page.getByTestId("legal-slide-3-keyword-time"), 180);
    await expectReadableText(page.getByTestId("legal-slide-3-panel-1").locator("p"), 180);
    await expectReadableText(page.getByTestId("legal-slide-3-footer"), 150);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-3")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-3-content"))).toBe(slideThreeScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-3")).toHaveCount(0);

    const story = page.locator(".story-container");
    const slideHeight = await story.evaluate((element) => (element as HTMLElement).clientHeight);

    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterSlideFour = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(Math.abs(afterSlideFour - slideHeight * 3)).toBeLessThanOrEqual(12);

    await expect(page.getByTestId("legal-slide-4")).toContainText("Public Website");
    await expect(page.getByRole("heading", { name: "The Front Door of the Legal System" })).toBeVisible();
    await expect(page.getByTestId("legal-slide-4-mockup")).toBeVisible();
    await expect(page.locator("[data-testid^='public-website-action-']")).toHaveCount(6);
    await expect(page.getByTestId("public-website-search-bar")).toBeVisible();
    await expect(page.getByTestId("public-website-search-copy")).toHaveText(
      "Search case status, judgments, or notices"
    );
    await expect(page.getByTestId("public-website-language-line")).toHaveText(
      "English • Hindi • Marathi"
    );
    await expect(page.getByTestId("speaker-script-4")).toHaveCount(0);
    await expectReadableText(page.getByTestId("legal-slide-4-kicker"), 175);
    await expectReadableText(page.getByTestId("legal-slide-4-core-idea"), 180);
    await expectReadableText(page.getByTestId("public-website-language-line"), 150);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-4")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-4-content"))).toBe(slideFourScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-4")).toHaveCount(0);

    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterSlideFive = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(Math.abs(afterSlideFive - slideHeight * 4)).toBeLessThanOrEqual(12);
  });

  test("mobile stacks slide 3 panels and keeps slide 4 quick actions readable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await jumpToSlide(page, 2);

    const slideThreePanels = [
      page.getByTestId("legal-slide-3-panel-1"),
      page.getByTestId("legal-slide-3-panel-2"),
      page.getByTestId("legal-slide-3-panel-3"),
    ];

    for (const panel of slideThreePanels) {
      await expect(panel).toBeVisible();
    }

    const panelBoxes = await Promise.all(slideThreePanels.map((panel) => panel.boundingBox()));
    const [firstPanel, secondPanel, thirdPanel] = panelBoxes;

    expect(firstPanel).not.toBeNull();
    expect(secondPanel).not.toBeNull();
    expect(thirdPanel).not.toBeNull();

    expect(Math.abs((firstPanel?.x ?? 0) - (secondPanel?.x ?? 0))).toBeLessThan(18);
    expect(Math.abs((secondPanel?.x ?? 0) - (thirdPanel?.x ?? 0))).toBeLessThan(18);
    expect((secondPanel?.y ?? 0) - (firstPanel?.y ?? 0)).toBeGreaterThan(44);
    expect((thirdPanel?.y ?? 0) - (secondPanel?.y ?? 0)).toBeGreaterThan(44);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-3")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-3")).toHaveCount(0);

    await jumpToSlide(page, 3);

    const publicActions = [
      page.getByTestId("public-website-action-case-status"),
      page.getByTestId("public-website-action-appointments"),
      page.getByTestId("public-website-action-judges"),
      page.getByTestId("public-website-action-judgments"),
      page.getByTestId("public-website-action-notices"),
      page.getByTestId("public-website-action-lawyer-login"),
    ];

    for (const action of publicActions) {
      await expect(action).toBeVisible();
    }

    await expect(page.getByTestId("public-website-search-copy")).toBeVisible();
    await expect(page.getByTestId("public-website-language-line")).toBeVisible();
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-4")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-4")).toHaveCount(0);
  });
});
