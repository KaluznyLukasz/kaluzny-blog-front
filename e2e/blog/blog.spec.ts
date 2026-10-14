import { expect, test } from "@playwright/test";

const TITLE = "Blog · Łukasz Kałużny";

test.describe("Given a visitor on the home page", () => {
  test.describe("when they choose Blog in the navigation", () => {
    test("then the blog opens and is marked as the current page", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation", { name: "Main" });

      await navigation.getByRole("link", { name: "Blog" }).click();

      await expect(page).toHaveURL("/blog");
      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
      await expect(
        navigation.getByRole("link", { name: "Blog" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
});

test.describe("Given a visitor with a link to the blog", () => {
  test.describe("when they open it", () => {
    test("then it shows the blog", async ({ page }) => {
      await page.goto("/blog");

      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
    });
  });
});
