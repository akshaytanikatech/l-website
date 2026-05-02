import { expect, test, type Locator, type Page } from "@playwright/test";

const slideNineScript = `Now, let us talk about judges' information. The platform can include a proper section where users can view judge names, sitting list, court assignments, bench details, and public profiles where available. [Small pause]

This is important because, in the legal sector, information about the bench and court assignment must be presented with clarity and respect.

The tone of this section should be official and dignified. It should help lawyers and users know which judge is sitting, what the bench details are, and how court assignments are structured.

This improves transparency while maintaining the dignity of the institution. [Speak slowly]`;

const slideTenScript = `Now we move from the public website to the lawyer dashboard. This is where the platform becomes especially useful for legal professionals. [Small pause]

A lawyer's work involves many details: case numbers, hearing dates, documents, evidence, notes, client instructions, and updates.

If these things are spread across emails, messages, physical files, and manual notes, it becomes difficult to manage everything properly.

The lawyer dashboard gives each lawyer a personal digital workspace. After secure login, the lawyer can see only the cases assigned to them. This keeps the system private, organized, and role-based. [Emphasize this line]

Simple words mein, each lawyer gets one clean place to manage their legal work.`;

const slideElevenScript = `Since legal work involves sensitive information, security is very important. [Speak slowly]

Lawyers can log in using their email ID or enrollment ID, along with a password. The system can also include two-factor authentication for extra protection. [Two-factor authentication means one extra verification step after password.]

Once the lawyer logs in, the platform verifies their role and shows only the information they are allowed to access.

This helps prevent unauthorized access. In legal work, confidentiality is extremely important. So the system must protect case information, client details, documents, and internal notes.

Yeh point important hai: the right person should get the right access, and nothing more. [Pause and look at audience]`;

const slideTwelveScript = `Inside the dashboard, lawyers can view their assigned cases in a clean list. Each case can show the case title, case number, current status, next hearing date, and uploaded documents or images. [Small pause]

The uploaded material may include scanned documents, evidence photos, site images, or supporting records.

With the growing importance of electronic records under the Bharatiya Sakshya Adhiniyam, 2023, secure handling of digital case material becomes even more important.

This is very practical because lawyers often need to review documents quickly before a hearing or client meeting.

Instead of searching through multiple folders or physical files, the lawyer can open the case and see all relevant material in one place. This saves time and improves preparation. [Emphasize this line]`;

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

test.describe("Legal professional slides 9 to 12", () => {
  test("desktop flow covers judges, lawyer workspace, security, and case material slides", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await jumpToSlide(page, 8);

    await expect(page.getByTestId("legal-slide-9")).toContainText("Judges Information");
    await expect(page.getByRole("heading", { name: "Clarity with institutional dignity." })).toBeVisible();
    await expect(page.getByTestId("legal-slide-9-directory")).toBeVisible();
    await expect(page.locator("[data-testid^='judges-directory-row-']")).toHaveCount(5);
    await expect(page.getByTestId("legal-slide-9-footer")).toHaveText(
      "Transparency should never reduce dignity."
    );
    await expectReadableText(page.getByTestId("legal-slide-9-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-9-footer"), 150);
    await expect(page.getByTestId("speaker-script-9")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-9")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-9-content"))).toBe(slideNineScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-9")).toHaveCount(0);

    await jumpToSlide(page, 9);

    await expect(page.getByTestId("legal-slide-10")).toContainText("Lawyer Dashboard");
    await expect(
      page.getByRole("heading", { name: "One clean workspace for legal professionals." })
    ).toBeVisible();
    await expect(page.getByTestId("lawyer-dashboard-shell")).toBeVisible();
    await expect(page.getByTestId("lawyer-dashboard-panel-assigned-cases")).toContainText(
      "Assigned Cases"
    );
    await expect(page.getByTestId("lawyer-dashboard-panel-hearing-dates")).toContainText(
      "Hearing Dates"
    );
    await expect(page.getByTestId("lawyer-dashboard-panel-documents")).toContainText("Documents");
    await expect(page.getByTestId("lawyer-dashboard-panel-notes")).toContainText("Notes");
    await expect(page.getByTestId("lawyer-dashboard-panel-evidence-updates")).toContainText(
      "Evidence"
    );
    await expectReadableText(page.getByTestId("legal-slide-10-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-10-footer"), 150);
    await expect(page.getByTestId("speaker-script-10")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-10")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-10-content"))).toBe(slideTenScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-10")).toHaveCount(0);

    await jumpToSlide(page, 10);

    await expect(page.getByTestId("legal-slide-11")).toContainText("Lawyer Login & Security");
    await expect(page.getByRole("heading", { name: "Right person. Right access. Nothing more." })).toBeVisible();
    await expect(page.getByTestId("lawyer-security-shell")).toBeVisible();
    await expect(page.getByTestId("lawyer-security-lock")).toBeVisible();
    await expect(page.locator("[data-testid^='security-step-']")).toHaveCount(5);
    await expect(page.getByTestId("security-step-5")).toContainText("Restricted Case Access");
    await expectReadableText(page.getByTestId("legal-slide-11-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-11-footer"), 150);
    await expect(page.getByTestId("speaker-script-11")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-11")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-11-content"))).toBe(
      slideElevenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-11")).toHaveCount(0);

    await jumpToSlide(page, 11);

    await expect(page.getByTestId("legal-slide-12")).toContainText("Assigned Cases & Documents");
    await expect(page.getByRole("heading", { name: "All relevant material in one place." })).toBeVisible();
    await expect(page.getByTestId("case-material-shell")).toBeVisible();
    await expect(page.getByTestId("case-material-central-file")).toContainText("Case File");
    await expect(page.locator("[data-testid^='case-material-tile-']")).toHaveCount(5);
    await expect(page.getByTestId("case-material-tile-1")).toContainText("Scanned Documents");
    await expect(page.getByTestId("case-material-tile-5")).toContainText("Court Orders");
    await expectReadableText(page.getByTestId("legal-slide-12-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-12-footer"), 150);
    await expect(page.getByTestId("speaker-script-12")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-12")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-12-content"))).toBe(
      slideTwelveScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-12")).toHaveCount(0);

    const story = page.locator(".story-container");
    const slideHeight = await story.evaluate((element) => (element as HTMLElement).clientHeight);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterSlideThirteen = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(Math.abs(afterSlideThirteen - slideHeight * 12)).toBeLessThanOrEqual(12);
  });

  test("mobile keeps the four legal-professional slides readable and stacked cleanly", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await jumpToSlide(page, 8);
    await expect(page.getByTestId("legal-slide-9-directory")).toBeVisible();
    await expect(page.getByTestId("judges-directory-row-1")).toBeVisible();
    await expect(page.getByTestId("judges-directory-row-5")).toBeVisible();

    await jumpToSlide(page, 9);
    await expect(page.getByTestId("lawyer-dashboard-shell")).toBeVisible();
    await expect(page.getByTestId("lawyer-dashboard-panel-assigned-cases")).toBeVisible();
    await expect(page.getByTestId("lawyer-dashboard-panel-evidence-updates")).toBeVisible();

    await jumpToSlide(page, 10);
    await expect(page.getByTestId("lawyer-security-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='security-step-']")).toHaveCount(5);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-11")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-11")).toHaveCount(0);

    await jumpToSlide(page, 11);
    await expect(page.getByTestId("case-material-shell")).toBeVisible();
    await expect(page.getByTestId("case-material-central-file")).toBeVisible();
    await expect(page.locator("[data-testid^='case-material-tile-']")).toHaveCount(5);
    await expect(page.getByTestId("case-material-tile-3")).toContainText("Site Images");
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-12")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-12")).toHaveCount(0);
  });
});
