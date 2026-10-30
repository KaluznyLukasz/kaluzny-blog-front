import { expect, test } from "@playwright/test";

const TITLE = "Portfolio · Łukasz Kałużny";
const PROJECT_COUNT = 2;
const CONTACT_INVITATION = "Let's build something together";

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
      await expect(page.getByRole("region")).toHaveCount(PROJECT_COUNT + 1);
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

test.describe("Given a visitor looking at the projects", () => {
  test.describe("when they read about a project", () => {
    test("then they see whether it is live and what it is built with", async ({
      page,
    }) => {
      await page.goto("/portfolio");
      const zstio = page.getByRole("region", { name: "ZSTiO" });
      const neighborly = page.getByRole("region", { name: "Neighborly" });

      await expect(zstio.getByText("Live", { exact: true })).toBeVisible();
      await expect(
        zstio.getByRole("list", { name: "Platforms and technologies" }),
      ).toContainText("Apple Watch");
      await expect(
        neighborly.getByText("In progress", { exact: true }),
      ).toBeVisible();
      await expect(
        neighborly.getByRole("list", { name: "Platforms and technologies" }),
      ).toContainText("SwiftUI");
    });
  });

  test.describe("when they have seen all of them", () => {
    test("then they are invited to get in touch", async ({ page }) => {
      await page.goto("/portfolio");

      await page
        .getByRole("region", { name: CONTACT_INVITATION })
        .getByRole("link", { name: "Get in touch" })
        .click();

      await expect(page).toHaveURL("/contact");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Contact",
      );
    });
  });
});
