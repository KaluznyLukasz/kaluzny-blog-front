import { expect, test } from "@playwright/test";

const SITE_NAME = "Łukasz Kałużny";

const PAGES = [
  { path: "/", title: SITE_NAME, description: /mobile developer/i },
  {
    path: "/portfolio",
    title: `Portfolio · ${SITE_NAME}`,
    description: /apps/i,
  },
  { path: "/blog", title: `Blog · ${SITE_NAME}`, description: /developer/i },
  {
    path: "/contact",
    title: `Contact · ${SITE_NAME}`,
    description: /channel/i,
  },
];

test.describe("Given a search engine or a chat app reading my pages", () => {
  for (const { path, title, description } of PAGES) {
    test.describe(`when it opens ${path}`, () => {
      test("then the page has a description and says how it should look when shared", async ({
        page,
      }) => {
        await page.goto(path);

        await expect(page).toHaveTitle(title);
        await expect(page.locator("meta[name='description']")).toHaveAttribute(
          "content",
          description,
        );
        await expect(page.locator("meta[property='og:title']")).toHaveAttribute(
          "content",
          title,
        );
        await expect(
          page.locator("meta[property='og:description']"),
        ).toHaveAttribute("content", description);
        await expect(page.locator("meta[property='og:type']")).toHaveAttribute(
          "content",
          "website",
        );
        await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute(
          "content",
          "summary",
        );
      });
    });
  }

  test.describe("when it opens the home page without running any script", () => {
    test.use({ javaScriptEnabled: false });

    test("then the description is already in the page it downloads", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("meta[name='description']")).toHaveAttribute(
        "content",
        /mobile developer/i,
      );
      await expect(page.locator("meta[property='og:title']")).toHaveAttribute(
        "content",
        SITE_NAME,
      );
    });
  });

  test.describe("when a visitor has turned JavaScript off", () => {
    test.use({ javaScriptEnabled: false });

    test("then the site still shows its layout and asks to turn it on", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(
        page.getByRole("navigation", { name: "Main" }),
      ).toBeVisible();
      expect(await page.getByRole("main").textContent()).toContain(
        "This website needs JavaScript to run",
      );
    });
  });

  test.describe("when it looks for the rules for crawlers", () => {
    test("then robots.txt welcomes everyone", async ({ request }) => {
      const response = await request.get("/robots.txt");

      expect(response.ok()).toBe(true);
      expect(await response.text()).toContain("User-agent: *");
      expect(await response.text()).toContain("Allow: /");
    });
  });

  test.describe("when a phone adds the site to its home screen", () => {
    test("then it has an icon for it", async ({ page }) => {
      await page.goto("/");

      await expect(page.locator("link[rel='apple-touch-icon']")).toHaveCount(1);
    });
  });
});
