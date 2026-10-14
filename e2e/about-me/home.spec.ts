import { expect, type Locator, type Page, test } from "@playwright/test";

const NAME = "Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const WIDE_SCREEN = { width: 1440, height: 900 };
const READING_WIDTH = 768;
const LONG_WORD = "Wolfeschlegelsteinhausenbergerdorff".repeat(5);

const openHomePage = async (page: Page) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
};

const imageSlotOf = (section: Locator) =>
  section.locator("xpath=../following-sibling::div[1]");

const scrollsSideways = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

test.describe("Given a visitor", () => {
  test.describe("when they open the home page", () => {
    test("then it shows my page, with my name as its main heading", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page).toHaveTitle(NAME);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(NAME);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(
        page
          .getByRole("navigation", { name: "Main" })
          .getByRole("link", { name: "About me" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });

  test.describe("when they want to get in touch", () => {
    test("then the footer offers an icon link to my GitHub, named in a tooltip", async ({
      page,
    }) => {
      await openHomePage(page);
      const footer = page.getByRole("contentinfo");
      const github = footer.getByRole("link", { name: "GitHub" });

      await footer.scrollIntoViewIfNeeded();

      await expect(
        footer.getByText(`© ${new Date().getFullYear()} ${NAME}`),
      ).toBeVisible();
      await expect(github).toHaveAttribute(
        "href",
        "https://github.com/KaluznyLukasz",
      );
      await github.hover();
      await expect(page.getByRole("tooltip")).toHaveText("GitHub");
    });
  });

  test.describe("when they use a phone screen, 360 px wide", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then everything is readable and the page never scrolls sideways", async ({
      page,
    }) => {
      await openHomePage(page);

      expect(
        await page.evaluate(() => document.documentElement.clientWidth),
      ).toBe(PHONE.width);
      await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
      expect(await scrollsSideways(page)).toBe(false);
    });

    test("then photos stay and decorative icons are hidden", async ({
      page,
    }) => {
      await openHomePage(page);

      await expect(
        imageSlotOf(page.getByRole("region", { name: "About me" })),
      ).toBeVisible();
      for (const name of ["Tech stack", "My journey"]) {
        await expect(
          imageSlotOf(page.getByRole("region", { name })),
        ).toBeHidden();
      }
    });
  });

  test.describe("when they use a wide screen, 1440 px", () => {
    test.use({ viewport: WIDE_SCREEN });

    test("then the content stays at a comfortable reading width, centred", async ({
      page,
    }) => {
      await openHomePage(page);
      const box = await page.getByRole("main").boundingBox();

      expect(box).not.toBeNull();
      const leftGap = box?.x ?? 0;
      const rightGap = WIDE_SCREEN.width - leftGap - (box?.width ?? 0);
      expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(1);
      for (const section of await page.getByRole("region").all()) {
        expect(
          await section.evaluate((element) => element.clientWidth),
        ).toBeLessThanOrEqual(READING_WIDTH);
      }
    });

    test("then the sections zig-zag from side to side", async ({ page }) => {
      await openHomePage(page);
      const lefts = await Promise.all(
        (await page.getByRole("region").all()).map((section) =>
          section.evaluate((element) => element.getBoundingClientRect().left),
        ),
      );

      for (let index = 1; index < lefts.length; index += 1) {
        expect(Math.abs(lefts[index] - lefts[index - 1])).toBeGreaterThan(100);
      }
    });

    test("then each section has a place for an image next to it", async ({
      page,
    }) => {
      await openHomePage(page);

      for (const section of await page.getByRole("region").all()) {
        const imageSlot = imageSlotOf(section);
        await imageSlot.scrollIntoViewIfNeeded();
        await expect(imageSlot).toBeVisible();
        await expect(imageSlot).toHaveCSS("opacity", "1");
        const sectionBox = await section.boundingBox();
        const slotBox = await imageSlot.boundingBox();

        const isBeside =
          (slotBox?.x ?? 0) >=
            (sectionBox?.x ?? 0) + (sectionBox?.width ?? 0) ||
          (slotBox?.x ?? 0) + (slotBox?.width ?? 0) <= (sectionBox?.x ?? 0);
        expect(isBeside).toBe(true);
      }
    });
  });

  test.describe("when they scroll down the page", () => {
    test("then each section appears with an animation once it is on screen", async ({
      page,
    }) => {
      await openHomePage(page);
      const lastSection = page
        .getByRole("region", { name: "My journey" })
        .locator("xpath=..");

      await expect(lastSection).not.toBeInViewport();
      await expect(lastSection).toHaveCSS("opacity", "0");

      await lastSection.scrollIntoViewIfNeeded();

      await expect(lastSection).toHaveCSS("animation-name", "enter");
      await expect(lastSection).toHaveCSS("opacity", "1");
    });
  });

  test.describe("when they prefer reduced motion", () => {
    test("then every section is shown without an animation", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await openHomePage(page);
      const lastSection = page
        .getByRole("region", { name: "My journey" })
        .locator("xpath=..");

      await expect(lastSection).not.toBeInViewport();
      await expect(lastSection).toHaveCSS("opacity", "1");
      await expect(lastSection).toHaveCSS("animation-name", "none");
    });
  });

  test.describe("when the name is a very long word on a phone", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then it wraps onto the next line instead of overflowing", async ({
      page,
    }) => {
      await openHomePage(page);
      const heading = page.getByRole("heading", { level: 1 });
      const lineHeight = await heading.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).lineHeight),
      );

      await heading.evaluate((element, word) => {
        element.textContent = word;
      }, LONG_WORD);

      const box = await heading.boundingBox();
      expect(box?.height).toBeGreaterThan(lineHeight);
      expect(
        await heading.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBe(true);
      expect(await scrollsSideways(page)).toBe(false);
    });
  });

  test.describe("when a keyboard user presses Tab", () => {
    test("then every link and button is reached, in reading order, with visible focus", async ({
      page,
    }) => {
      await openHomePage(page);
      const focusables = page.locator("a[href], button:not([disabled])");
      const count = await focusables.count();

      expect(count).toBeGreaterThan(0);
      for (let index = 0; index < count; index += 1) {
        await page.keyboard.press("Tab");
        const element = focusables.nth(index);

        await expect(element).toBeFocused();
        await expect(element).not.toHaveCSS("outline-style", "none");
        await expect(element).not.toHaveCSS("outline-width", "0px");
      }
    });
  });

  test.describe("when the page shows images", () => {
    test("then each has a text alternative or is marked as decorative", async ({
      page,
    }) => {
      await openHomePage(page);

      await expect(
        page.getByRole("img", { name: `${NAME} avatar` }),
      ).toBeVisible();
      await expect(
        page.getByRole("img", { name: /^Me standing on a rock at Meteora/ }),
      ).toBeVisible();
      await expect(page.locator("img:not([alt])")).toHaveCount(0);
      await expect(
        page.locator("svg:not([aria-hidden='true'], [aria-hidden='true'] svg)"),
      ).toHaveCount(0);
    });
  });
});
