import { expect, type Page, test } from "@playwright/test";

const SITE_NAME = "Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const PAGES_WITHOUT_API = ["/", "/portfolio", "/contact", "/privacy", "/legal"];

const scrollsSideways = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

test.describe("Given a visitor on any page", () => {
  test.describe("when they choose Privacy policy in the footer", () => {
    test("then the privacy policy opens", async ({ page }) => {
      await page.goto("/portfolio");

      await page
        .getByRole("navigation", { name: "Legal" })
        .getByRole("link", { name: "Privacy policy" })
        .click();

      await expect(page).toHaveURL("/privacy");
      await expect(page).toHaveTitle(`Privacy policy · ${SITE_NAME}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Privacy policy",
      );
    });
  });

  test.describe("when they choose Legal notice in the footer", () => {
    test("then the legal notice opens", async ({ page }) => {
      await page.goto("/contact");

      await page
        .getByRole("navigation", { name: "Legal" })
        .getByRole("link", { name: "Legal notice" })
        .click();

      await expect(page).toHaveURL("/legal");
      await expect(page).toHaveTitle(`Legal notice · ${SITE_NAME}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Legal notice",
      );
    });
  });
});

test.describe("Given a visitor reading the site", () => {
  for (const path of PAGES_WITHOUT_API) {
    test.describe(`when they open ${path}`, () => {
      test("then their browser contacts no server other than this one, not even for fonts", async ({
        page,
        baseURL,
      }) => {
        const origins = new Set<string>();
        page.on("request", (request) => {
          const url = new URL(request.url());
          if (url.protocol.startsWith("http")) origins.add(url.origin);
        });

        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForLoadState("networkidle");

        expect([...origins]).toEqual([new URL(baseURL ?? "").origin]);
      });

      test("then the site keeps nothing in their browser", async ({
        page,
        context,
      }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");

        expect(await context.cookies()).toEqual([]);
        expect(
          await page.evaluate(() => [
            localStorage.length,
            sessionStorage.length,
          ]),
        ).toEqual([0, 0]);
      });
    });
  }
});

test.describe("Given a visitor on the privacy policy", () => {
  test.describe("when they want to use their rights", () => {
    test("then the policy tells them how to reach me and where to complain", async ({
      page,
    }) => {
      await page.goto("/privacy");
      const main = page.getByRole("main");

      await expect(
        main.getByRole("region", { name: "Your rights" }),
      ).toContainText("(Article 17)");
      await expect(
        main.getByRole("link", { name: "Personal Data Protection Office" }),
      ).toHaveAttribute("href", "https://uodo.gov.pl/en");

      await main.getByRole("link", { name: "Contact page" }).first().click();

      await expect(page).toHaveURL("/contact");
    });
  });
});

test.describe("Given a visitor on the legal notice", () => {
  test.describe("when they open the third-party licences", () => {
    test("then the licences of the software in the site are shown", async ({
      page,
    }) => {
      await page.goto("/legal");

      await page
        .getByRole("main")
        .getByRole("link", { name: "Third-party licences" })
        .click();

      await expect(page).toHaveURL("/third-party-licenses.txt");
      const text = (await page.locator("body").textContent()) ?? "";
      expect(text).toContain("## react - ");
      expect(text).toContain("## react-router - ");
      expect(text).toContain("Permission is hereby granted");
    });
  });
});

test.describe("Given a visitor on a phone screen, 360 px wide", () => {
  test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

  for (const path of ["/privacy", "/legal"]) {
    test.describe(`when they read ${path}`, () => {
      test("then the page never scrolls sideways and the footer links fit", async ({
        page,
      }) => {
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        const legal = page.getByRole("navigation", { name: "Legal" });
        await legal.scrollIntoViewIfNeeded();

        for (const name of ["Privacy policy", "Legal notice"]) {
          await expect(legal.getByRole("link", { name })).toBeInViewport({
            ratio: 1,
          });
        }
        expect(await scrollsSideways(page)).toBe(false);
      });
    });
  }
});
