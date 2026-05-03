import { expect, test, type Locator, type Page } from "@playwright/test";

const slideThirteenScript = `The platform can also include image editing tools. This is useful when lawyers need to prepare case material. [Small pause]

For example, a lawyer may need to crop an image, rotate a scanned document, highlight an important part, add labels, blur sensitive information, or make annotations. [Annotations means small notes or markings added on the image.]

These tools help the lawyer prepare evidence or supporting material without leaving the platform.

Another important point is accountability. Every edit can be tracked. So, if someone edits a document image or marks evidence, the system can maintain a proper record.

This is important in legal work because document handling must be careful, traceable, and responsible. Simple words mein, every important action should have a clear record. [Pause and look at audience]`;

const slideFourteenScript = `Another useful feature is shared notes inside the lawyer dashboard. When a lawyer opens case information, they can add notes directly to that case file. [Small pause]

These notes can include hearing preparation points, client instructions, document observations, legal strategy points, and follow-up tasks.

The lawyer can also check notes added by other authorized lawyers. The system can show who added each note, when it was added, and which case it belongs to.

This helps multiple lawyers work on the same matter without losing important information in separate messages, emails, or personal files.

So, the case file becomes one shared place for case information, team notes, and collaboration history. Isse teamwork clear and organized rahega. [Pause and look at audience]`;

const slideFifteenScript = `The lawyer timeline is another important feature. The timeline shows all important updates in one place. [Small pause]

For example, it can show a new case assignment, uploaded document, edited image, admin note, appointment update, or hearing date change.

This means the lawyer does not need to manually check everything again and again. The dashboard tells the lawyer what changed and when it changed.

This improves awareness and reduces the chance of missing important updates. Simple words mein, lawyer ko latest update ek jagah milta rahega. [Emphasize this line]`;

const slideSixteenScript = `Now let us move to the admin dashboard. The admin dashboard is the control center of the platform. [Speak slowly]

While the lawyer dashboard supports legal professionals, the admin dashboard supports the operational side.

Admins can manage users, appointments, Justice Clock data, lawyer activity, and notes oversight. This gives leadership and admin teams better visibility of the entire system.

Matlab, leadership can understand what is happening, where action is needed, and how the system is performing. [Pause and look at audience]`;

async function jumpToSlide(page: Page, index: number) {
  const story = page.locator(".story-container");

  await story.evaluate((element, slideIndex) => {
    const container = element as HTMLElement;
    container.scrollTo({ top: container.clientHeight * (slideIndex as number), behavior: "auto" });
    container.dispatchEvent(new Event("scroll"));
  }, index);

  await page.waitForTimeout(500);
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

test.describe("Legal operations slides 13 to 16", () => {
  test("desktop presentation covers evidence prep, shared notes, timeline, and admin control", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await jumpToSlide(page, 12);

    await expect(page.getByTestId("legal-slide-13")).toContainText("Evidence Preparation");
    await expect(page.getByRole("heading", { name: "Edit carefully. Track every action." })).toBeVisible();
    await expect(page.getByTestId("evidence-editor-shell")).toBeVisible();
    await expect(page.getByTestId("evidence-editor-toolbar")).toContainText("Crop");
    await expect(page.getByTestId("evidence-editor-toolbar")).toContainText("Annotate");
    await expect(page.getByTestId("evidence-editor-accountability")).toContainText("Edit History");
    await expect(page.getByTestId("evidence-editor-accountability")).toContainText("Audit Trail");
    await expect(
      page.locator("[data-testid='evidence-editor-shell']").getByText("Action", { exact: true })
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='evidence-editor-shell']").getByText("User", { exact: true })
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='evidence-editor-shell']").getByText("Time", { exact: true })
    ).toBeVisible();
    await expect(page.getByTestId("legal-slide-13-footer")).toHaveText(
      "Every important action should have a clear record."
    );
    await expectReadableText(page.getByTestId("legal-slide-13-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-13-footer"), 150);
    await expect(page.getByText("Crop").first()).toBeVisible();
    await expectReadableText(page.getByText("Crop").first(), 185);
    await expect(page.getByTestId("speaker-script-13")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-13")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-13-content"))).toBe(
      slideThirteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-13")).toHaveCount(0);

    await jumpToSlide(page, 13);

    await expect(page.getByTestId("legal-slide-14")).toContainText("Shared Notes");
    await expect(page.getByRole("heading", { name: "Case collaboration, connected to the case." })).toBeVisible();
    await expect(page.getByTestId("shared-notes-case-card")).toBeVisible();
    await expect(page.locator("[data-testid^='shared-note-card-']")).toHaveCount(5);
    await expect(page.getByTestId("shared-note-card-1")).toContainText("Hearing Preparation");
    await expect(page.getByTestId("shared-note-card-5")).toContainText("Follow-up Tasks");
    await expect(page.getByTestId("shared-notes-history")).toContainText("Authorized View");
    await expectReadableText(page.getByTestId("legal-slide-14-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-14-footer"), 150);
    await expect(page.getByTestId("speaker-script-14")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-14")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-14-content"))).toBe(
      slideFourteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-14")).toHaveCount(0);

    await jumpToSlide(page, 14);

    await expect(page.getByTestId("legal-slide-15")).toContainText("Lawyer Timeline");
    await expect(
      page.getByRole("heading", { name: "The latest update, always in one place." })
    ).toBeVisible();
    await expect(page.getByTestId("lawyer-timeline-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='lawyer-timeline-event-']")).toHaveCount(6);
    await expect(page.getByTestId("lawyer-timeline-event-1")).toContainText("Latest Update");
    await expect(page.getByTestId("lawyer-timeline-event-6")).toContainText("Hearing Date Change");
    await expectReadableText(page.getByTestId("legal-slide-15-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-15-footer"), 150);
    await expect(page.getByTestId("speaker-script-15")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-15")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-15-content"))).toBe(
      slideFifteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-15")).toHaveCount(0);

    await jumpToSlide(page, 15);

    await expect(page.getByTestId("legal-slide-16")).toContainText("Admin Dashboard");
    await expect(page.getByRole("heading", { name: "The control center of the platform." })).toBeVisible();
    await expect(page.getByTestId("admin-dashboard-shell")).toBeVisible();
    await expect(page.getByTestId("admin-dashboard-center")).toContainText("Platform Overview");
    await expect(page.locator("[data-testid^='admin-dashboard-module-']")).toHaveCount(5);
    await expect(page.getByTestId("admin-dashboard-module-1")).toContainText("User Management");
    await expect(page.getByTestId("admin-dashboard-module-5")).toContainText("Notes Oversight");
    await expectReadableText(page.getByTestId("legal-slide-16-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-16-footer"), 150);
    await expect(page.getByTestId("speaker-script-16")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-16")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-16-content"))).toBe(
      slideSixteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-16")).toHaveCount(0);

    const story = page.locator(".story-container");
    const slideHeight = await story.evaluate((element) => (element as HTMLElement).clientHeight);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterSlideSeventeen = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(Math.abs(afterSlideSeventeen - slideHeight * 16)).toBeLessThanOrEqual(12);
    await expect(page.getByTestId("legal-slide-17")).toContainText("User Management");
  });

  test("mobile keeps the four added legal slides readable and Shift scripts overlay-only", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await jumpToSlide(page, 12);
    await expect(page.getByTestId("evidence-editor-shell")).toBeVisible();
    await expect(page.getByTestId("evidence-editor-accountability")).toContainText("Timestamp");
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-13")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-13")).toHaveCount(0);

    await jumpToSlide(page, 13);
    await expect(page.getByTestId("shared-notes-case-card")).toBeVisible();
    await expect(page.locator("[data-testid^='shared-note-card-']")).toHaveCount(5);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-14")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-14")).toHaveCount(0);

    await jumpToSlide(page, 14);
    await expect(page.getByTestId("lawyer-timeline-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='lawyer-timeline-event-']")).toHaveCount(6);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-15")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-15")).toHaveCount(0);

    await jumpToSlide(page, 15);
    await expect(page.getByTestId("admin-dashboard-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='admin-dashboard-module-']")).toHaveCount(5);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-16")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-16")).toHaveCount(0);
  });
});
