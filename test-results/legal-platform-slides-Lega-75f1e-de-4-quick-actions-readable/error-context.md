# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: legal-platform-slides.spec.ts >> Legal platform slides 3 and 4 >> mobile stacks slide 3 panels and keeps slide 4 quick actions readable
- Location: tests/legal-platform-slides.spec.ts:124:3

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
  3   | const slideThreeScript = `Let me begin with the legal platform. Iska main purpose hai to create a smarter and more organized digital system for legal operations. [Small pause]
  4   | 
  5   | In a legal environment, time, accuracy, confidentiality, and accountability are very important. Lawyers need quick access to case details. Admin teams need proper control. Clients and citizens need transparency. And the institution needs a system that reduces confusion and delays.
  6   | 
  7   | This platform is designed around three main areas: public website access, lawyer dashboard, and admin dashboard. [Speak slowly]
  8   | 
  9   | As the larger discussion around Why Bharat Matters reminds us, Indian institutions need systems designed for Indian scale, Indian complexity, and Indian users. So the goal is not just to make a website.
  10  | 
  11  | The goal is to create faster access, better transparency, and smoother legal operations. [Pause and look at audience]`;
  12  | 
  13  | const slideFourScript = `First, let us talk about the public website. The public website works like the main entrance of the legal system. Matlab, when someone comes to the website, they should quickly understand where to go and what to do. [Small pause]
  14  | 
  15  | When someone visits the website, they should not feel confused. They should immediately know where to search, what service to use, and how to access the information they need.
  16  | 
  17  | The website can include important sections like Home, About Court, Judges, Case Status, Appointments, Judgments, Notices, Lawyer Login, and Admin Login. It can also include a language change option for English, Hindi, and Marathi, so users can choose the language they are comfortable with. This gives the website a formal and professional legal-sector feel.
  18  | 
  19  | The platform should also feel connected to Indian legal and institutional realities, not like a copied template. This connects naturally with the broader idea in India that is Bharat.
  20  | 
  21  | For example, if a client or citizen wants to check case status, they should not have to call multiple people or visit the office again and again. They can simply go to the website and use the case status option.
  22  | 
  23  | If someone wants to see judges' information, sitting judges, bench details, or court assignments, they can access it in a structured way. If someone wants to book an appointment, they can do it directly through the website.
  24  | 
  25  | So, the website becomes one official platform for important legal access. Yeh system confusion kam karega and will make access easier. [Pause and look at audience]`;
  26  | 
  27  | async function jumpToSlide(page: Page, index: number) {
  28  |   const story = page.locator(".story-container");
  29  | 
> 30  |   await story.evaluate((element, slideIndex) => {
      |               ^ Error: locator.evaluate: Test timeout of 120000ms exceeded.
  31  |     const container = element as HTMLElement;
  32  |     container.scrollTo({ top: container.clientHeight * (slideIndex as number), behavior: "auto" });
  33  |     container.dispatchEvent(new Event("scroll"));
  34  |   }, index);
  35  | 
  36  |   await page.waitForTimeout(450);
  37  | }
  38  | 
  39  | async function readScript(block: Locator) {
  40  |   return (await block.innerText()).replace(/\r\n/g, "\n").trim();
  41  | }
  42  | 
  43  | async function expectReadableText(locator: Locator, minBrightness = 150) {
  44  |   const color = await locator.evaluate((element) => {
  45  |     const value = window.getComputedStyle(element).color;
  46  |     const matches = value.match(/[\d.]+/g) ?? [];
  47  |     return matches.slice(0, 3).map((part) => Number(part));
  48  |   });
  49  | 
  50  |   expect(color).toHaveLength(3);
  51  | 
  52  |   const [rawRed, rawGreen, rawBlue] = color;
  53  |   const [red, green, blue] =
  54  |     rawRed <= 1 && rawGreen <= 1 && rawBlue <= 1
  55  |       ? [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel * 255))
  56  |       : [rawRed, rawGreen, rawBlue].map((channel) => Math.round(channel));
  57  | 
  58  |   const brightness = red * 0.299 + green * 0.587 + blue * 0.114;
  59  |   expect(brightness).toBeGreaterThan(minBrightness);
  60  | }
  61  | 
  62  | test.describe("Legal platform slides 3 and 4", () => {
  63  |   test("desktop presentation shows legal platform intro, public website portal, and Shift practice mode", async ({
  64  |     page,
  65  |   }) => {
  66  |     await page.setViewportSize({ width: 1440, height: 900 });
  67  |     await page.goto("/");
  68  |     await jumpToSlide(page, 2);
  69  | 
  70  |     await expect(page.getByTestId("legal-slide-3")).toContainText("Part 1: Legal Platform");
  71  |     await expect(page.getByRole("heading", { name: "Smarter Legal Operations" })).toBeVisible();
  72  |     await expect(page.getByTestId("legal-slide-3-footer")).toHaveText(
  73  |       "Public Website • Lawyer Dashboard • Admin Dashboard"
  74  |     );
  75  |     await expect(page.locator("[data-testid^='legal-slide-3-panel-']")).toHaveCount(3);
  76  |     await expect(page.getByTestId("speaker-script-3")).toHaveCount(0);
  77  |     await expectReadableText(page.getByTestId("legal-slide-3-kicker"), 175);
  78  |     await expectReadableText(page.getByTestId("legal-slide-3-keyword-time"), 180);
  79  |     await expectReadableText(page.getByTestId("legal-slide-3-panel-1").locator("p"), 180);
  80  |     await expectReadableText(page.getByTestId("legal-slide-3-footer"), 150);
  81  | 
  82  |     await page.keyboard.down("Shift");
  83  |     await expect(page.getByTestId("speaker-script-3")).toBeVisible();
  84  |     expect(await readScript(page.getByTestId("speaker-script-3-content"))).toBe(slideThreeScript);
  85  |     await page.keyboard.up("Shift");
  86  |     await expect(page.getByTestId("speaker-script-3")).toHaveCount(0);
  87  | 
  88  |     const story = page.locator(".story-container");
  89  |     const slideHeight = await story.evaluate((element) => (element as HTMLElement).clientHeight);
  90  | 
  91  |     await page.keyboard.press("ArrowDown");
  92  |     await page.waitForTimeout(900);
  93  |     const afterSlideFour = await story.evaluate((element) => (element as HTMLElement).scrollTop);
  94  |     expect(Math.abs(afterSlideFour - slideHeight * 3)).toBeLessThanOrEqual(12);
  95  | 
  96  |     await expect(page.getByTestId("legal-slide-4")).toContainText("Public Website");
  97  |     await expect(page.getByRole("heading", { name: "The Front Door of the Legal System" })).toBeVisible();
  98  |     await expect(page.getByTestId("legal-slide-4-mockup")).toBeVisible();
  99  |     await expect(page.locator("[data-testid^='public-website-action-']")).toHaveCount(6);
  100 |     await expect(page.getByTestId("public-website-search-bar")).toBeVisible();
  101 |     await expect(page.getByTestId("public-website-search-copy")).toHaveText(
  102 |       "Search case status, judgments, or notices"
  103 |     );
  104 |     await expect(page.getByTestId("public-website-language-line")).toHaveText(
  105 |       "English • Hindi • Marathi"
  106 |     );
  107 |     await expect(page.getByTestId("speaker-script-4")).toHaveCount(0);
  108 |     await expectReadableText(page.getByTestId("legal-slide-4-kicker"), 175);
  109 |     await expectReadableText(page.getByTestId("legal-slide-4-core-idea"), 180);
  110 |     await expectReadableText(page.getByTestId("public-website-language-line"), 150);
  111 | 
  112 |     await page.keyboard.down("Shift");
  113 |     await expect(page.getByTestId("speaker-script-4")).toBeVisible();
  114 |     expect(await readScript(page.getByTestId("speaker-script-4-content"))).toBe(slideFourScript);
  115 |     await page.keyboard.up("Shift");
  116 |     await expect(page.getByTestId("speaker-script-4")).toHaveCount(0);
  117 | 
  118 |     await page.keyboard.press("ArrowDown");
  119 |     await page.waitForTimeout(900);
  120 |     const afterSlideFive = await story.evaluate((element) => (element as HTMLElement).scrollTop);
  121 |     expect(Math.abs(afterSlideFive - slideHeight * 4)).toBeLessThanOrEqual(12);
  122 |   });
  123 | 
  124 |   test("mobile stacks slide 3 panels and keeps slide 4 quick actions readable", async ({ page }) => {
  125 |     await page.setViewportSize({ width: 390, height: 844 });
  126 |     await page.goto("/");
  127 |     await jumpToSlide(page, 2);
  128 | 
  129 |     const slideThreePanels = [
  130 |       page.getByTestId("legal-slide-3-panel-1"),
```