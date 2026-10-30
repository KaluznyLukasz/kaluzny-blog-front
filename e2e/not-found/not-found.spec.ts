import { expect, test } from "@playwright/test";

const TITLE = "Page not found · Łukasz Kałużny";

test.describe("Given a visitor with a wrong address", () => {
  test.describe("when they open it", () => {
    test("then the page says it does not exist, inside the layout of the site", async ({
      page,
    }) => {
      await page.goto("/there/is/nothing/here");

      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Page not found",
      );
      await expect(
        page.getByRole("navigation", { name: "Main" }),
      ).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
    });

    test("then search engines are asked to leave the page out", async ({
      page,
    }) => {
      await page.goto("/there/is/nothing/here");

      await expect(page.locator("meta[name='robots']")).toHaveAttribute(
        "content",
        "noindex",
      );
    });
  });

  test.describe("when they choose the way back to the home page", () => {
    test("then the home page opens", async ({ page }) => {
      await page.goto("/there/is/nothing/here");

      await page.getByRole("link", { name: "Back to home" }).click();

      await expect(page).toHaveURL("/");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Łukasz Kałużny",
      );
    });
  });

  test.describe("when the address looks like a real page that is not there", () => {
    test("then it says so for a portfolio address too", async ({ page }) => {
      await page.goto("/portfolio/old-project");

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Page not found",
      );
    });
  });
});
