import { expect, test, type Locator, type Page } from "@playwright/test";

const slideSeventeenScript = `In the admin dashboard, user management is very important. Admins can manage lawyers, staff, citizens, and other admins. [Small pause]

They can create users, edit profiles, assign roles, disable accounts, and reset access. This keeps the platform secure and organized.

The right person should have the right access. For example, a lawyer should see only assigned cases. An admin should manage operational data. A public user should only access public services.

This role-based structure protects sensitive legal information. [Emphasize this line]`;

const slideEighteenScript = `Admins can also manage appointments. They can view all bookings, approve appointments, reschedule them, cancel invalid requests, assign appointment slots, and track appointment attendance. [Small pause]

This improves client service and reduces confusion at the office. For a legal firm, organized appointment management is very important because it directly affects client experience.

When appointments are properly managed, visitors feel that the firm is professional and prepared. Yeh small feature hai, but client impression par strong impact karta hai. [Pause and look at audience]

Admins can also manage Justice Clock data. They can update Institution, Disposal and Case Clearance Rate, Agewise Pendency, and Listed Today in English and Hindi. [Small pause]

The goal is not only to display numbers. The goal is to maintain accuracy, accountability, and public trust.

If the data is managed properly, the Justice Clock becomes a reliable transparency feature. It also helps administration move from assumption-based decisions to data-based decisions.

This is important for any modern legal institution. Simple words mein, decisions should be based on real data, not guesswork. [Emphasize this line]`;

const slideNineteenScript = `The admin dashboard can also show lawyer activity in a clear and organized way. [Small pause]

Admins can check which lawyer accessed which case, what case information they updated, what note they added, what document or image they changed, and when the activity happened.

This is not meant for micromanagement. [Emphasize this line] It is meant to create visibility and accountability, especially because legal case material is sensitive.

A clear activity record helps the firm understand whether work is moving forward, which cases are being updated, and whether important case tasks are being handled on time. [Pause and look at audience]

Admins can also monitor shared notes where permission is allowed. They can check who added a note, what note was added, when it was added, which case it belongs to, and whether any action is required. [Small pause]

This helps keep communication organized and gives the admin team a proper audit view of case-related updates. [Audit view means a clear record that can be checked later.]

It also ensures that important information does not remain hidden in personal messages or separate files. Everything stays connected to the case. [Emphasize this line]`;

const slideTwentyScript = `Now, after looking at the legal platform, we can see one clear theme: a professional legal firm needs structured systems. [Pause and look at audience]

The legal platform improves how cases, appointments, judges' information, documents, and legal workflows are managed. But there is another important part of any firm's success. That part is internal team management.

Even if the legal work is organized, the office also needs proper systems for employees, attendance, working hours, breaks, and internal records.

Currently, Bedi & Associates does not have a complete HR management system. Because of this, attendance tracking can become manual, time-consuming, and sometimes unclear.

So, the next solution we are proposing is a practical step toward better internal management: Cross-Platform Attendance Software for Bedi & Associates.

This software supports the same overall vision: transparency, accountability, organization, and trust. Iska main purpose hai office operations ko simple, fair, and clear banana. [Small pause]`;

const slideTwentyOneScript = `Now let us talk about the attendance software. Every workplace needs a clear and fair way to manage attendance. [Small pause]

For Bedi & Associates, this becomes even more important because the firm needs a simple system that can work across different employee devices. The software should support Windows, Mac, and Linux.

The main purpose is simple: employees should be able to clock in easily, take breaks without confusion, and clock out properly at the end of the day.

At the same time, employers and admins should be able to view attendance records clearly. The goal is not to create pressure. The goal is to create transparency, fairness, accountability, and trust. [Emphasize this line]

Simple words mein, it is not for watching employees. It is for keeping attendance fair and clear.`;

const slideTwentyTwoScript = `Right now, because there is no proper HR management system, attendance may depend on manual records or informal tracking. This can create problems. [Speak slowly]

For the employer, it becomes difficult to know accurate working hours. For admin or HR teams, manual records can take extra time. For leadership, it becomes harder to understand attendance trends clearly.

And for employees, if attendance is handled poorly, they may feel uncomfortable or distrusted.

So, the issue is not only about tracking time. The real issue is creating a system that supports both management and employees. Matlab, system should give clarity to leadership and fairness to employees. [Pause and look at audience]

Attendance is not just about clock-in and clock-out. It is about creating a fair work culture. [Speak slowly]

When employees know that their time is recorded properly, their breaks are respected, and their work hours are visible in a fair way, they feel more comfortable.

At the same time, when management gets accurate data, they can make better decisions without depending on assumptions.

This creates a balance. Employees feel trusted, and management gets clarity. That is why this attendance software should be introduced as a support system, not as a surveillance tool. [Emphasize this line]

Yeh line important hai: support system, not surveillance tool.`;

const slideTwentyThreeScript = `The process can be very simple. First, the attendance software is installed on employee systems. [Small pause]

It works across Windows, Mac, and Linux, so the firm does not have to worry about different operating systems.

When employees start their workday, they clock in through the software. This creates a clear record of their start time. During the day, if employees take a break, they can mark the break in the system.

This helps the firm understand work patterns while still respecting flexibility. At the end of the day, employees clock out. This completes their attendance record for that day.

On the admin side, management can view the information through a dashboard. The dashboard can show total hours worked, breaks taken, attendance trends, daily activity summary, and consistency records.

This makes attendance management easier and more reliable. Simple words mein, employee process easy rahega and admin view clear rahega. [Pause and look at audience]

For Bedi & Associates, this software gives many practical benefits. [Small pause]

First, it creates clear attendance tracking. The firm does not have to depend only on manual attendance records.

Second, it reduces admin work. Instead of spending extra time maintaining spreadsheets or manual registers, attendance data is recorded automatically.

Third, it improves transparency. Both employees and employers can clearly understand working hours and break records.

Fourth, it supports multiple platforms. Whether the employee uses Windows, Mac, or Linux, the same system can work smoothly.

Fifth, it helps leadership make better decisions. Management can understand attendance trends based on actual data.

And most importantly, it supports a trust-based work culture. The message is very clear: this software is not about watching employees. It is about making attendance fair, simple, and transparent. [Emphasize this line]`;

const slideTwentyFourScript = `This system is also useful for employees. Employees benefit because their attendance is recorded fairly. [Small pause]

Their work hours are clearly visible. Their breaks are respected. They do not have to depend on manual attendance entries. And they can feel confident that their time is being valued.

So, the software should not feel like pressure. It should feel like protection and clarity. [Emphasize this line]

A good attendance system supports both the firm and the employees. Simple words mein, dono sides ko clarity milti hai.

By introducing this attendance software, Bedi & Associates will not just be adding another tool. The firm will be moving toward a more organized workplace culture. [Speak slowly]

A culture where employees are trusted. A culture where leadership has clarity. A culture where breaks are respected. A culture where time is valued. And a culture where accountability and trust work together.

This is especially useful because the firm currently does not have a complete HR management system.

So, this attendance software can become the first practical step toward better employee record management and smoother internal workflow. Yeh ek practical starting point ho sakta hai for better HR discipline. [Pause and look at audience]

To summarize, today we presented two connected solutions. The first is the legal platform. [Small pause]

This platform improves public access, case status search, Justice Clock visibility, appointment booking, judges' information, lawyer dashboards, case document handling, shared notes, timelines, and admin control.

It helps legal professionals focus more on justice and less on paperwork.

The second solution is the attendance software. This software helps Bedi & Associates manage employee attendance, working hours, breaks, and records in a fair and transparent way. It is especially useful because the firm currently does not have a proper HR management system.

Together, both systems support one common goal: a more organized, transparent, accountable, and professional legal firm. [Emphasize this line]

The legal platform improves legal and case-related operations. The attendance software improves internal employee and office operations.

In that sense, the proposal reflects the same broad direction seen in Why Bharat Matters and The India Way: stronger institutions need smarter systems, better access, and accountable administration.

So, this is not just about software. It is about building a smarter legal workplace. [Speak slowly]

A workplace where clients get better service, lawyers work with better clarity, admins manage with better control, and employees feel trusted and respected.

Thank you. [Pause and look at audience]`;

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

test.describe("Legal slides 17 to 24", () => {
  test("desktop presentation covers admin controls, attendance transition, workflow, and closing vision", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await jumpToSlide(page, 16);

    await expect(page.getByTestId("legal-slide-17")).toContainText("User Management");
    await expect(page.getByRole("heading", { name: "The right access for the right person." })).toBeVisible();
    await expect(page.getByTestId("user-management-matrix")).toBeVisible();
    await expect(page.locator("[data-testid^='user-management-row-']")).toHaveCount(4);
    await expect(page.getByTestId("user-management-row-1")).toContainText("Lawyers");
    await expect(page.getByTestId("user-management-row-4")).toContainText("Admins");
    await expect(page.getByTestId("user-management-badge")).toContainText("Role-Based Access");
    await expectReadableText(page.getByTestId("legal-slide-17-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-17-footer"), 150);
    await expect(page.getByTestId("speaker-script-17")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-17")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-17-content"))).toBe(
      slideSeventeenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-17")).toHaveCount(0);

    await jumpToSlide(page, 17);

    await expect(page.getByTestId("legal-slide-18")).toContainText("Operational Management");
    await expect(
      page.getByRole("heading", { name: "Appointments and Justice Clock data, managed clearly." })
    ).toBeVisible();
    await expect(page.getByTestId("appointment-operations-panel")).toContainText("View Bookings");
    await expect(page.getByTestId("appointment-operations-panel")).toContainText("Track Attendance");
    await expect(page.getByTestId("justice-clock-operations-panel")).toContainText("Institution");
    await expect(page.getByTestId("justice-clock-operations-panel")).toContainText("Listed Today");
    await expectReadableText(page.getByTestId("legal-slide-18-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-18-footer"), 150);
    await expect(page.getByTestId("speaker-script-18")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-18")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-18-content"))).toBe(
      slideEighteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-18")).toHaveCount(0);

    await jumpToSlide(page, 18);

    await expect(page.getByTestId("legal-slide-19")).toContainText("Activity & Notes Oversight");
    await expect(page.getByRole("heading", { name: "Visibility without micromanagement." })).toBeVisible();
    await expect(page.getByTestId("activity-ledger-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='activity-ledger-row-']")).toHaveCount(6);
    await expect(page.getByTestId("activity-ledger-row-1")).toContainText("Case Accessed");
    await expect(page.getByTestId("notes-oversight-panel")).toContainText("Whether action is required");
    await expect(page.getByTestId("activity-ledger-badge")).toContainText(
      "Accountability, not micromanagement"
    );
    await expectReadableText(page.getByTestId("legal-slide-19-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-19-footer"), 150);
    await expect(page.getByTestId("speaker-script-19")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-19")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-19-content"))).toBe(
      slideNineteenScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-19")).toHaveCount(0);

    await jumpToSlide(page, 19);

    await expect(page.getByTestId("legal-slide-20")).toContainText("From Legal Operations to Office Operations");
    await expect(
      page.getByRole("heading", { name: "A professional legal firm needs structured systems." })
    ).toBeVisible();
    await expect(page.getByTestId("operations-bridge-legal")).toContainText("Case workflows");
    await expect(page.getByTestId("operations-bridge-attendance")).toContainText("Work hours");
    await expect(page.getByTestId("legal-slide-20-footer")).toHaveText(
      "Next: Cross-Platform Attendance Software"
    );
    await expectReadableText(page.getByTestId("legal-slide-20-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-20-footer"), 150);
    await expect(page.getByTestId("speaker-script-20")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-20")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-20-content"))).toBe(slideTwentyScript);
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-20")).toHaveCount(0);

    await jumpToSlide(page, 20);

    await expect(page.getByTestId("legal-slide-21")).toContainText("Cross-Platform Attendance Software");
    await expect(
      page.getByRole("heading", { name: "Fair attendance visibility across every employee device." })
    ).toBeVisible();
    await expect(page.getByTestId("attendance-platform-card-windows")).toContainText("Windows");
    await expect(page.getByTestId("attendance-platform-card-mac")).toContainText("Mac");
    await expect(page.getByTestId("attendance-platform-card-linux")).toContainText("Linux");
    await expect(page.getByTestId("attendance-flow-shell")).toContainText("Clock In");
    await expect(page.getByTestId("attendance-admin-summary")).toContainText("Trends");
    await expectReadableText(page.getByTestId("legal-slide-21-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-21-footer"), 150);
    await expect(page.getByTestId("speaker-script-21")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-21")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-21-content"))).toBe(
      slideTwentyOneScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-21")).toHaveCount(0);

    await jumpToSlide(page, 21);

    await expect(page.getByTestId("legal-slide-22")).toContainText("Current Situation");
    await expect(page.getByRole("heading", { name: "Manual tracking creates uncertainty." })).toBeVisible();
    await expect(page.getByTestId("current-situation-before")).toContainText("Manual Records");
    await expect(page.getByTestId("current-situation-after")).toContainText("Clear Attendance Data");
    await expect(page.getByTestId("current-situation-balance")).toHaveText(
      "Clarity for leadership. Fairness for employees."
    );
    await expectReadableText(page.getByTestId("legal-slide-22-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-22-footer"), 150);
    await expect(page.getByTestId("speaker-script-22")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-22")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-22-content"))).toBe(
      slideTwentyTwoScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-22")).toHaveCount(0);

    await jumpToSlide(page, 22);

    await expect(page.getByTestId("legal-slide-23")).toContainText("How It Works");
    await expect(page.getByRole("heading", { name: "Simple for employees. Clear for admins." })).toBeVisible();
    await expect(page.getByTestId("attendance-workflow-shell")).toBeVisible();
    await expect(page.locator("[data-testid^='attendance-workflow-step-']")).toHaveCount(5);
    await expect(page.getByTestId("attendance-workflow-step-5")).toContainText("Admin Dashboard");
    await expect(page.locator("[data-testid^='attendance-benefit-card-']")).toHaveCount(6);
    await expect(page.getByTestId("attendance-benefit-card-6")).toContainText("Trust-Based Culture");
    await expectReadableText(page.getByTestId("legal-slide-23-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-23-footer"), 150);
    await expect(page.getByTestId("speaker-script-23")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-23")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-23-content"))).toBe(
      slideTwentyThreeScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-23")).toHaveCount(0);

    await jumpToSlide(page, 23);

    await expect(page.getByTestId("legal-slide-24")).toContainText("Final Vision");
    await expect(page.getByRole("heading", { name: "Building a smarter legal workplace." })).toBeVisible();
    await expect(page.getByTestId("final-vision-pillar-legal-platform")).toContainText("Justice Clock");
    await expect(page.getByTestId("final-vision-pillar-attendance-software")).toContainText("Trust culture");
    await expect(page.getByTestId("final-vision-closing-line")).toContainText("More organized.");
    await expect(page.getByTestId("final-vision-thanks")).toHaveText("Thank you.");
    await expectReadableText(page.getByTestId("legal-slide-24-kicker"), 185);
    await expectReadableText(page.getByTestId("legal-slide-24-footer"), 150);
    await expect(page.getByTestId("speaker-script-24")).toHaveCount(0);

    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-24")).toBeVisible();
    expect(await readScript(page.getByTestId("speaker-script-24-content"))).toBe(
      slideTwentyFourScript
    );
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-24")).toHaveCount(0);

    const story = page.locator(".story-container");
    const beforeLastArrow = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(900);
    const afterLastArrow = await story.evaluate((element) => (element as HTMLElement).scrollTop);
    expect(afterLastArrow).toBe(beforeLastArrow);
  });

  test("mobile keeps slides 17 to 24 readable and stacked while Shift scripts stay overlay-only", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await jumpToSlide(page, 16);
    await expect(page.getByTestId("user-management-matrix")).toBeVisible();
    await expect(page.locator("[data-testid^='user-management-row-']")).toHaveCount(4);
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-17")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-17")).toHaveCount(0);

    await jumpToSlide(page, 17);
    await expect(page.getByTestId("appointment-operations-panel")).toBeVisible();
    await expect(page.getByTestId("justice-clock-operations-panel")).toBeVisible();

    await jumpToSlide(page, 18);
    await expect(page.getByTestId("activity-ledger-shell")).toBeVisible();
    await expect(page.getByTestId("notes-oversight-panel")).toBeVisible();

    await jumpToSlide(page, 19);
    await expect(page.getByTestId("operations-bridge-legal")).toBeVisible();
    await expect(page.getByTestId("operations-bridge-attendance")).toBeVisible();

    await jumpToSlide(page, 20);
    await expect(page.getByTestId("attendance-platform-card-windows")).toBeVisible();
    await expect(page.getByTestId("attendance-admin-summary")).toBeVisible();

    await jumpToSlide(page, 21);
    await expect(page.getByTestId("current-situation-before")).toBeVisible();
    await expect(page.getByTestId("current-situation-after")).toBeVisible();

    await jumpToSlide(page, 22);
    await expect(page.locator("[data-testid^='attendance-workflow-step-']")).toHaveCount(5);
    await expect(page.locator("[data-testid^='attendance-benefit-card-']")).toHaveCount(6);

    await jumpToSlide(page, 23);
    await expect(page.getByTestId("final-vision-pillar-legal-platform")).toBeVisible();
    await expect(page.getByTestId("final-vision-pillar-attendance-software")).toBeVisible();
    await page.keyboard.down("Shift");
    await expect(page.getByTestId("speaker-script-24")).toBeVisible();
    await page.keyboard.up("Shift");
    await expect(page.getByTestId("speaker-script-24")).toHaveCount(0);
  });
});
