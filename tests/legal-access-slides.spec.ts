import { expect, test, type Locator, type Page } from "@playwright/test";

const slideFiveScript = `On the homepage, the platform should highlight the services that people use most often. [Small pause]

These quick action buttons can include Check Case Status, Book Appointment, View Judges, View Cause List, Search Judgments, and Lawyer Login.

These buttons are useful because legal users are usually busy. Lawyers, clients, and admin staff do not have time to search through many pages. With one click, they can reach the exact service they need.

This improves convenience and also builds confidence in the platform. It gives a clear impression that the firm or institution is organized, modern, and service-focused. [Emphasize this line]`;

const slideSixScript = `Now, one of the most important parts of the legal platform is case status search. In legal work, case tracking is very important. [Speak slowly]

A person should be able to search a case using different details, such as case number, party name, advocate name, filing number, or judge-wise search.

This is useful because everyone may not have the same information. A lawyer may search by case number. A client may remember only the party name. An admin person may use the filing number.

Sometimes, information may need to be checked judge-wise.

Once the search is done, the system should show important case details, like current case status, next hearing date, assigned court, relevant orders, and complete case timeline. [Small pause]

This helps lawyers and clients understand where the matter currently stands. Instead of depending on manual follow-ups, everyone can see the updated position clearly. This improves transparency and saves time. Simple words mein, people get clarity without unnecessary back-and-forth. [Pause and look at audience]`;

const slideSevenScript = `Another important feature is the Justice Clock. The Justice Clock is not just a display screen. It is a transparency and accountability tool. [Speak slowly]

It can show updated Justice Clock details in English and Hindi, such as Institution, Disposal and Case Clearance Rate, Agewise Pendency, and Listed Today. Of course, this information can be updated by the admin whenever required.

This idea also connects with the larger spirit reflected in landmark judgments: legal systems must remain transparent, accessible, accountable, and worthy of public trust.

When people can see real data, they understand that the system is active, measurable, and improving.

For leadership and administration, the Justice Clock is also useful because it helps identify pressure points. [Small pause]

Matlab, it does not only show numbers. It helps leadership understand where attention is needed. [Pause and look at audience]`;

const slideEightScript = `Next, we have appointment booking. In a legal office or court-related environment, appointments can become confusing if they are handled manually. [Small pause]

People may come without proper scheduling. Staff may not know who is coming, when they are coming, or what the purpose of the visit is. This can create crowding, waiting time, and communication gaps.

Through this platform, users can book appointments online. Appointment types may include registry visit, document verification, lawyer consultation, or administrative inquiry.

The user can select the date, time slot, purpose of visit, and contact details. After that, the system can confirm the booking and even send reminders.

This makes the process more organized and helps the admin team manage visitors properly. For a legal firm like Bedi & Associates, this feature can make client handling more professional and structured. [Emphasize this line]`;

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

test.describe("Legal access slides 5 to 8", () => {
  test("desktop flow covers homepage actions, case tracking, justice clock timing, and appointment booking", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await jumpToSlide(page, 4);

    await expect(page.getByTestId("legal-slide-5")).toContainText("Homepage Quick Actions");
    await expect(page.getByRole("heading", { name: "One click to the right legal service." })).toBeVisible();
    await expect(page.locator("[data-testid^='homepage-quick-action-']")).toHaveCount(6);
    await expect(page.getByTestId("legal-slide-5-footer")).toHaveText("Convenience builds confidence.");
    await expectReadableText(page.getByTestId("legal-slide-5-kicker"), 175);
    await expectReadableText(page.getByTestId("legal-slide-5-footer"), 150);
    await expect(page.getByTestId("speaker-script-5")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-5")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-5-content"))).toBe(slideFiveScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-5")).toHaveCount(0);

    await jumpToSlide(page, 5);

    await expect(page.getByTestId("legal-slide-6")).toContainText("Case Status Search");
    await expect(page.getByRole("heading", { name: "Clarity without unnecessary follow-ups." })).toBeVisible();
    await expect(page.getByTestId("legal-slide-6-search-bar")).toBeVisible();
    await expect(page.locator("[data-testid^='case-search-chip-']")).toHaveCount(5);
    await expect(page.getByTestId("legal-slide-6-result-card")).toContainText("Case Timeline");
    await expectReadableText(page.getByTestId("legal-slide-6-kicker"), 175);
    await expectReadableText(page.getByText("Search by case number, party name, advocate name, filing number, or judge-wise search."), 170);
    await expect(page.getByTestId("speaker-script-6")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-6")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-6-content"))).toBe(slideSixScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-6")).toHaveCount(0);

    await jumpToSlide(page, 6);

    await expect(page.getByTestId("legal-slide-7")).toContainText("Justice Clock");
    await expect(page.getByRole("heading", { name: "Transparency that leadership can measure." })).toBeVisible();
    await expect(page.getByTestId("justice-clock-panel")).toBeVisible();
    await expect(page.getByTestId("justice-clock-table-title")).toHaveText(
      "Institution, Disposal & Case Clearance Rate"
    );
    await expect(page.getByTestId("justice-table-one-last-day-institution")).toContainText("42,706");
    await expectReadableText(page.getByTestId("justice-clock-table-title"), 215);
    await expectReadableText(page.getByTestId("justice-table-one-last-day-institution"), 215);
    await expect(page.getByTestId("speaker-script-7")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-7")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-7-content"))).toBe(slideSevenScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-7")).toHaveCount(0);

    await page.waitForTimeout(5600);
    await expect(page.getByTestId("justice-table-one-last-day-institution")).toContainText("42,718");
    await expect(page.getByTestId("justice-table-one-last-day-disposal")).toContainText("16,486");

    await page.waitForTimeout(2200);
    await expect(page.getByTestId("justice-clock-table-title")).toHaveText("Agewise Pendency & Listed Today");
    await expect(page.getByTestId("justice-table-two-total-listed-today")).toContainText("9,00,092");

    await jumpToSlide(page, 7);

    await expect(page.getByTestId("legal-slide-8")).toContainText("Appointment Booking");
    await expect(page.getByRole("heading", { name: "Structured visits. Better client handling." })).toBeVisible();
    await expect(page.locator("[data-testid^='appointment-type-']")).toHaveCount(4);
    await expect(page.getByTestId("legal-slide-8-booking")).toBeVisible();
    await expect(page.getByTestId("appointment-selected-date")).toContainText("14");
    await expect(page.getByTestId("appointment-selected-slot")).toContainText("12:00 PM");
    await expectReadableText(page.getByTestId("legal-slide-8-kicker"), 175);
    await expectReadableText(page.getByText("Online scheduling reduces waiting, crowding, and communication gaps."), 170);
    await expect(page.getByTestId("speaker-script-8")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-8")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-8-content"))).toBe(slideEightScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-8")).toHaveCount(0);

    const story = page.locator(".story-container");
    const slideHeight = await story.evaluate((element) => (element as HTMLElement).clientHeight);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterPulseFlow = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(Math.abs(afterPulseFlow - slideHeight * 8)).toBeLessThanOrEqual(12);
  });

  test("mobile keeps slide 5 actions, justice clock text, and appointment booking readable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await jumpToSlide(page, 4);

    const quickActions = [
      page.getByTestId("homepage-quick-action-check-case-status"),
      page.getByTestId("homepage-quick-action-book-appointment"),
      page.getByTestId("homepage-quick-action-view-judges"),
      page.getByTestId("homepage-quick-action-view-cause-list"),
      page.getByTestId("homepage-quick-action-search-judgments"),
      page.getByTestId("homepage-quick-action-lawyer-login"),
    ];

    for (const quickAction of quickActions) {
      await expect(quickAction).toBeVisible();
    }

    await jumpToSlide(page, 6);
    await expect(page.getByTestId("justice-clock-panel")).toBeVisible();
    await expect(page.getByTestId("justice-table-one-today-institution")).toBeVisible();
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-7")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-7")).toHaveCount(0);

    await jumpToSlide(page, 7);
    await expect(page.getByTestId("legal-slide-8-booking")).toBeVisible();
    await expect(page.getByTestId("appointment-selected-date")).toBeVisible();
    await expect(page.getByTestId("appointment-selected-slot")).toBeVisible();
    await expect(page.getByText("Reminder Active")).toBeVisible();
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-8")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-8")).toHaveCount(0);
  });
});
