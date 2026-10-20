import { expect, test } from "@playwright/test";

const TITLE = "Portfolio · Łukasz Kałużny";
const PROJECT_COUNT = 2;

test.describe("Given a visitor on the home page", () => {
  test.describe("when they choose Portfolio in the navigation", () => {
    test("then the portfolio opens and is marked as the current page", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation", { name: "Main" });

      await navigation.getByRole("link", { name: "Portfolio" }).click();

      await expect(page).toHaveURL("/portfolio");
      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Portfolio",
      );
      await expect(
        navigation.getByRole("link", { name: "Portfolio" }),
      ).toHaveAttribute("aria-current", "page");
      await expect(page.getByRole("region")).toHaveCount(PROJECT_COUNT);
      for (const app of ["ZSTiO", "Neighborly"]) {
        await expect(
          page.getByRole("img", { name: `${app} app icon` }),
        ).toBeVisible();
      }
    });
  });
});

test.describe("Given a visitor with a link to the portfolio", () => {
  test.describe("when they open it", () => {
    test("then it shows the portfolio", async ({ page }) => {
      await page.goto("/portfolio");

      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Portfolio",
      );
    });
  });
});
