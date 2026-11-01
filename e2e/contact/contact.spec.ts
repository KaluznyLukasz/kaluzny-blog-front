import { expect, test } from "@playwright/test";

const TITLE = "Contact · Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };

const CHANNELS = [
  ["GitHub", "https://github.com/KaluznyLukasz"],
  ["LinkedIn", "https://www.linkedin.com/in/"],
  ["Facebook", "https://www.facebook.com/"],
  ["Instagram", "https://www.instagram.com/"],
];

test.describe("Given a visitor on the home page", () => {
  test.describe("when they choose Contact in the navigation", () => {
    test("then the contact page opens and is marked as the current page", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation", { name: "Main" });

      await navigation.getByRole("link", { name: "Contact" }).click();

      await expect(page).toHaveURL("/contact");
      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Contact",
      );
      await expect(
        navigation.getByRole("link", { name: "Contact" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
});

test.describe("Given a visitor on the contact page", () => {
  test.describe("when they look for a way to reach me", () => {
    test("then every channel is a link with a hint about what it is for", async ({
      page,
    }) => {
      await page.goto("/contact");
      const main = page.getByRole("main");

      for (const [name, href] of CHANNELS) {
        const link = main.getByRole("link", { name: new RegExp(`^${name}`) });

        await expect(link).toBeVisible();
        expect(await link.getAttribute("href")).toContain(href);
      }
      await expect(main.getByRole("link")).toHaveCount(CHANNELS.length);
      await expect(main.getByText("Browse the code I write")).toBeVisible();
    });
  });

  test.describe("when they hover over a channel", () => {
    test("then it lifts to show that it can be pressed", async ({ page }) => {
      await page.goto("/contact");
      const card = page
        .getByRole("main")
        .getByRole("link", { name: /^GitHub/ });
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations().map((animation) => animation.finished),
        ),
      );
      const before = (await card.boundingBox())?.y ?? 0;

      await card.hover();

      await expect
        .poll(async () => (await card.boundingBox())?.y ?? 0)
        .toBeLessThan(before);
    });
  });

  test.describe("when they use a phone screen, 360 px wide", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then the whole navigation fits and the page never scrolls sideways", async ({
      page,
    }) => {
      await page.goto("/contact");
      const navigation = page.getByRole("navigation", { name: "Main" });

      for (const name of ["About me", "Portfolio", "Blog", "Contact"]) {
        await expect(navigation.getByRole("link", { name })).toBeInViewport({
          ratio: 1,
        });
      }
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
        ),
      ).toBe(false);
    });
  });
});
