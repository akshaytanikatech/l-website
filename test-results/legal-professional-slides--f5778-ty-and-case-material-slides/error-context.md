# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: legal-professional-slides.spec.ts >> Legal professional slides 9 to 12 >> desktop flow covers judges, lawyer workspace, security, and case material slides
- Location: tests/legal-professional-slides.spec.ts:77:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('.story-container')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - img [ref=e4]
    - button "Open Tanstack query devtools" [ref=e52] [cursor=pointer]:
      - img [ref=e53]
  - region "Notifications alt+T"
  - generic [ref=e102]:
    - img "Jwero" [ref=e103]
    - generic [ref=e104]:
      - heading "The One Stop Solution for your Company." [level=1] [ref=e105]
      - paragraph [ref=e106]: Manage crm, products, inventory, and suppliers in one place.
    - generic [ref=e107]:
      - link "Sign in" [ref=e108] [cursor=pointer]:
        - /url: /login
      - link "Go to Dashboard" [ref=e109] [cursor=pointer]:
        - /url: /organizations
  - button "Open Next.js Dev Tools" [ref=e115] [cursor=pointer]:
    - img [ref=e116]
  - alert [ref=e119]
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | 
  3   | const slideNineScript = `Now, let us talk about judges' information. The platform can include a proper section where users can view judge names, sitting list, court assignments, bench details, and public profiles where available. [Small pause]
  4   | 
  5   | This is important because, in the legal sector, information about the bench and court assignment must be presented with clarity and respect.
  6   | 
  7   | The tone of this section should be official and dignified. It should help lawyers and users know which judge is sitting, what the bench details are, and how court assignments are structured.
  8   | 
  9   | This improves transparency while maintaining the dignity of the institution. [Speak slowly]`;
  10  | 
  11  | const slideTenScript = `Now we move from the public website to the lawyer dashboard. This is where the platform becomes especially useful for legal professionals. [Small pause]
  12  | 
  13  | A lawyer's work involves many details: case numbers, hearing dates, documents, evidence, notes, client instructions, and updates.
  14  | 
  15  | If these things are spread across emails, messages, physical files, and manual notes, it becomes difficult to manage everything properly.
  16  | 
  17  | The lawyer dashboard gives each lawyer a personal digital workspace. After secure login, the lawyer can see only the cases assigned to them. This keeps the system private, organized, and role-based. [Emphasize this line]
  18  | 
  19  | Simple words mein, each lawyer gets one clean place to manage their legal work.`;
  20  | 
  21  | const slideElevenScript = `Since legal work involves sensitive information, security is very important. [Speak slowly]
  22  | 
  23  | Lawyers can log in using their email ID or enrollment ID, along with a password. The system can also include two-factor authentication for extra protection. [Two-factor authentication means one extra verification step after password.]
  24  | 
  25  | Once the lawyer logs in, the platform verifies their role and shows only the information they are allowed to access.
  26  | 
  27  | This helps prevent unauthorized access. In legal work, confidentiality is extremely important. So the system must protect case information, client details, documents, and internal notes.
  28  | 
  29  | Yeh point important hai: the right person should get the right access, and nothing more. [Pause and look at audience]`;
  30  | 
  31  | const slideTwelveScript = `Inside the dashboard, lawyers can view their assigned cases in a clean list. Each case can show the case title, case number, current status, next hearing date, and uploaded documents or images. [Small pause]
  32  | 
  33  | The uploaded material may include scanned documents, evidence photos, site images, or supporting records.
  34  | 
  35  | With the growing importance of electronic records under the Bharatiya Sakshya Adhiniyam, 2023, secure handling of digital case material becomes even more important.
  36  | 
  37  | This is very practical because lawyers often need to review documents quickly before a hearing or client meeting.
  38  | 
  39  | Instead of searching through multiple folders or physical files, the lawyer can open the case and see all relevant material in one place. This saves time and improves preparation. [Emphasize this line]`;
  40  | 
  41  | async function jumpToSlide(page: Page, index: number) {
  42  |   const story = page.locator(".story-container");
  43  | 
> 44  |   await story.evaluate((element, slideIndex) => {
      |               ^ Error: locator.evaluate: Test timeout of 120000ms exceeded.
  45  |     const container = element as HTMLElement;
  46  |     container.scrollTo({ top: container.clientHeight * (slideIndex as number), behavior: "auto" });
  47  |     container.dispatchEvent(new Event("scroll"));
  48  |   }, index);
  49  | 
  50  |   await page.waitForTimeout(450);
  51  | }
  52  | 
  53  | async function readScript(block: Locator) {
  54  |   return (await block.innerText()).replace(/\r\n/g, "\n").trim();
  55  | }
  56  | 
  57  | async function expectReadableText(locator: Locator, minBrightness = 150) {
  58  |   const color = await locator.evaluate((element) => {
  59  |     const value = window.getComputedStyle(element).color;
  60  |     const matches = value.match(/[\d.]+/g) ?? [];
  61  |     return matches.slice(0, 3).map((part) => Number(part));
  62  |   });
  63  | 
  64  |   expect(color).toHaveLength(3);
  65  | 
  66  |   const [rawRed, rawGreen, rawBlue] = color;
  67  |   const [red, green, blue] =
  68  |     rawRed <= 1 && rawGreen <= 1 && rawBlue <= 1
  69  |       ? [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel * 255))
  70  |       : [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel));
  71  | 
  72  |   const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
  73  |   expect(brightness).toBeGreaterThan(minBrightness);
  74  | }
  75  | 
  76  | test.describe("Legal professional slides 9 to 12", () => {
  77  |   test("desktop flow covers judges, lawyer workspace, security, and case material slides", async ({
  78  |     page,
  79  |   }) => {
  80  |     await page.setViewportSize({ width: 1440, height: 900 });
  81  |     await page.goto("/");
  82  | 
  83  |     await jumpToSlide(page, 8);
  84  | 
  85  |     await expect(page.getByTestId("legal-slide-9")).toContainText("Judges Information");
  86  |     await expect(page.getByRole("heading", { name: "Clarity with institutional dignity." })).toBeVisible();
  87  |     await expect(page.getByTestId("legal-slide-9-directory")).toBeVisible();
  88  |     await expect(page.locator("[data-testid^='judges-directory-row-']")).toHaveCount(5);
  89  |     await expect(page.getByTestId("legal-slide-9-footer")).toHaveText(
  90  |       "Transparency should never reduce dignity."
  91  |     );
  92  |     await expectReadableText(page.getByTestId("legal-slide-9-kicker"), 185);
  93  |     await expectReadableText(page.getByTestId("legal-slide-9-footer"), 150);
  94  |     await expect(page.getByTestId("speaker-script-9")).toHaveCount(0);
  95  | 
  96  |     await page.keyboard.down("Shift");
  97  |     await expect(page.getByTestId("speaker-script-9")).toBeVisible();
  98  |     expect(await readScript(page.getByTestId("speaker-script-9-content"))).toBe(slideNineScript);
  99  |     await page.keyboard.up("Shift");
  100 |     await expect(page.getByTestId("speaker-script-9")).toHaveCount(0);
  101 | 
  102 |     await jumpToSlide(page, 9);
  103 | 
  104 |     await expect(page.getByTestId("legal-slide-10")).toContainText("Lawyer Dashboard");
  105 |     await expect(
  106 |       page.getByRole("heading", { name: "One clean workspace for legal professionals." })
  107 |     ).toBeVisible();
  108 |     await expect(page.getByTestId("lawyer-dashboard-shell")).toBeVisible();
  109 |     await expect(page.getByTestId("lawyer-dashboard-panel-assigned-cases")).toContainText(
  110 |       "Assigned Cases"
  111 |     );
  112 |     await expect(page.getByTestId("lawyer-dashboard-panel-hearing-dates")).toContainText(
  113 |       "Hearing Dates"
  114 |     );
  115 |     await expect(page.getByTestId("lawyer-dashboard-panel-documents")).toContainText("Documents");
  116 |     await expect(page.getByTestId("lawyer-dashboard-panel-notes")).toContainText("Notes");
  117 |     await expect(page.getByTestId("lawyer-dashboard-panel-evidence-updates")).toContainText(
  118 |       "Evidence"
  119 |     );
  120 |     await expectReadableText(page.getByTestId("legal-slide-10-kicker"), 185);
  121 |     await expectReadableText(page.getByTestId("legal-slide-10-footer"), 150);
  122 |     await expect(page.getByTestId("speaker-script-10")).toHaveCount(0);
  123 | 
  124 |     await page.keyboard.down("Shift");
  125 |     await expect(page.getByTestId("speaker-script-10")).toBeVisible();
  126 |     expect(await readScript(page.getByTestId("speaker-script-10-content"))).toBe(slideTenScript);
  127 |     await page.keyboard.up("Shift");
  128 |     await expect(page.getByTestId("speaker-script-10")).toHaveCount(0);
  129 | 
  130 |     await jumpToSlide(page, 10);
  131 | 
  132 |     await expect(page.getByTestId("legal-slide-11")).toContainText("Lawyer Login & Security");
  133 |     await expect(page.getByRole("heading", { name: "Right person. Right access. Nothing more." })).toBeVisible();
  134 |     await expect(page.getByTestId("lawyer-security-shell")).toBeVisible();
  135 |     await expect(page.getByTestId("lawyer-security-lock")).toBeVisible();
  136 |     await expect(page.locator("[data-testid^='security-step-']")).toHaveCount(5);
  137 |     await expect(page.getByTestId("security-step-5")).toContainText("Restricted Case Access");
  138 |     await expectReadableText(page.getByTestId("legal-slide-11-kicker"), 185);
  139 |     await expectReadableText(page.getByTestId("legal-slide-11-footer"), 150);
  140 |     await expect(page.getByTestId("speaker-script-11")).toHaveCount(0);
  141 | 
  142 |     await page.keyboard.down("Shift");
  143 |     await expect(page.getByTestId("speaker-script-11")).toBeVisible();
  144 |     expect(await readScript(page.getByTestId("speaker-script-11-content"))).toBe(
```