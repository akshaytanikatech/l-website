import { expect, test, type Locator, type Page } from "@playwright/test";

const slideOneScript = `Good morning everyone. Thank you for giving us the opportunity to present today. [Small pause]

Today, we are not presenting two separate software ideas. We are presenting one connected vision for Bedi & Associates. The vision is simple: to make legal work and office work more organized, transparent, and efficient through digital systems. [Speak slowly]

In the spirit of The India Way, this proposal is not only about adding technology. It is about building stronger, more adaptable legal and office systems for the future. Simple words mein, technology should support the institution, not make the work more complicated.`;

const slideTwoScript = `The first part of our presentation is about a Legal Platform. This platform is designed for smarter court and legal operations. It helps lawyers, admins, and users access important legal information faster, manage cases better, and improve transparency.

After that, we will move to the second part: Cross-Platform Attendance Software for Bedi & Associates.

This is important because, currently, the firm does not have a proper HR management system. So attendance, employee records, breaks, and work-hour visibility can become difficult if everything is handled manually.

Overall idea simple hai: first, we improve legal operations. Then, we improve internal office operations. Together, both systems help the firm work in a more professional, structured, and transparent way.`;

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

test.describe("Legal presentation opening slides", () => {
  test("desktop content and Shift-held practice scripts match the new direction", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await expect(
      page.getByTestId("legal-slide-1").getByRole("heading", {
        name: "Building a Smarter Legal Workplace",
      })
    ).toBeVisible();
    await expect(page.getByTestId("legal-slide-1")).toContainText("Bedi & Associates");
    await expect(page.getByTestId("legal-slide-1")).toContainText(
      "Legal operations + internal office systems, connected through clarity, accountability, and trust."
    );
    await expect(page.getByTestId("legal-slide-1-footer")).toHaveText(
      "Legal Platform • Attendance Software • Institutional Efficiency"
    );
    await expect(page.getByTestId("legal-slide-1-image")).toBeVisible();
    await expect(page.getByTestId("speaker-script-1")).toHaveCount(0);
    await expectReadableText(page.getByTestId("legal-slide-1-brand"), 190);
    await expectReadableText(page.getByTestId("legal-slide-1-footer"), 150);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-1")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-1-content"))).toBe(slideOneScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-1")).toHaveCount(0);

    await jumpToSlide(page, 1);

    await expect(
      page.getByRole("heading", { name: "One Proposal. Two Systems. One Direction." })
    ).toBeVisible();
    await expect(page.getByTestId("legal-slide-2")).toContainText(
      "First, legal operations. Then, internal office operations."
    );
    await expect(page.getByTestId("proposal-card-legal-platform")).toContainText("Legal Platform");
    await expect(page.getByTestId("proposal-card-attendance-software")).toContainText(
      "Attendance Software"
    );
    await expect(page.getByTestId("proposal-card-common-outcome")).toContainText("Common Outcome");
    await expect(page.locator("[data-testid^='proposal-card-']")).toHaveCount(3);
    await expect(page.getByTestId("speaker-script-2")).toHaveCount(0);
    await expectReadableText(page.getByText("One Proposal. Two Systems. One Direction."), 200);
    await expectReadableText(
      page.getByText("First, legal operations. Then, internal office operations."),
      150
    );

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-2")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-2-content"))).toBe(slideTwoScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-2")).toHaveCount(0);
  });

  test("tablet keeps the proposal in a 2-plus-1 card layout", async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 1100 });
    await page.goto("/");
    await jumpToSlide(page, 1);

    const legalCard = page.getByTestId("proposal-card-legal-platform");
    const attendanceCard = page.getByTestId("proposal-card-attendance-software");
    const outcomeCard = page.getByTestId("proposal-card-common-outcome");

    const [legalBox, attendanceBox, outcomeBox] = await Promise.all([
      legalCard.boundingBox(),
      attendanceCard.boundingBox(),
      outcomeCard.boundingBox(),
    ]);

    expect(legalBox).not.toBeNull();
    expect(attendanceBox).not.toBeNull();
    expect(outcomeBox).not.toBeNull();

    expect(Math.abs((legalBox?.y ?? 0) - (attendanceBox?.y ?? 0))).toBeLessThan(24);
    expect((outcomeBox?.y ?? 0) - (legalBox?.y ?? 0)).toBeGreaterThan(180);
    expect(outcomeBox?.width ?? 0).toBeGreaterThan((legalBox?.width ?? 0) - 24);
    expect(
      Math.abs(
        (outcomeBox?.x ?? 0) +
          (outcomeBox?.width ?? 0) / 2 -
          ((page.viewportSize()?.width ?? 0) / 2)
      )
    ).toBeLessThan(56);
  });

  test("mobile stacks the cards and keeps practice mode hidden until Shift is held", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByTestId("speaker-script-1")).toHaveCount(0);

    await jumpToSlide(page, 1);

    const cards = [
      page.getByTestId("proposal-card-legal-platform"),
      page.getByTestId("proposal-card-attendance-software"),
      page.getByTestId("proposal-card-common-outcome"),
    ];

    for (const card of cards) {
      await expect(card).toBeVisible();
    }

    const boxes = await Promise.all(cards.map((card) => card.boundingBox()));
    const [firstBox, secondBox, thirdBox] = boxes;

    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    expect(thirdBox).not.toBeNull();

    expect(Math.abs((firstBox?.x ?? 0) - (secondBox?.x ?? 0))).toBeLessThan(12);
    expect(Math.abs((secondBox?.x ?? 0) - (thirdBox?.x ?? 0))).toBeLessThan(12);
    expect((secondBox?.y ?? 0) - (firstBox?.y ?? 0)).toBeGreaterThan(120);
    expect((thirdBox?.y ?? 0) - (secondBox?.y ?? 0)).toBeGreaterThan(120);

    await expect(page.getByTestId("speaker-script-2")).toHaveCount(0);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-2")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-2")).toHaveCount(0);
  });
});
