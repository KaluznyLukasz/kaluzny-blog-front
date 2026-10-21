import { expect, type Page, test } from "@playwright/test";
import {
  ARTICLES,
  ARTICLES_URL,
  answerWith,
  neverAnswer,
  PUBLISHED_DATES,
  serveArticles,
} from "./articlesApi";

const TITLE = "Blog · Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const LONG_TITLE = "Wolfeschlegelsteinhausenbergerdorff".repeat(5);

const navigation = (page: Page) =>
  page.getByRole("navigation", { name: "Main" });

test.describe("Given a visitor on the home page", () => {
  test.describe("when they choose Blog in the navigation", () => {
    test("then the blog opens and is marked as the current page", async ({
      page,
    }) => {
      await serveArticles(page);
      await page.goto("/");

      await navigation(page).getByRole("link", { name: "Blog" }).click();

      await expect(page).toHaveURL("/blog");
      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
      await expect(
        navigation(page).getByRole("link", { name: "Blog" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
});

test.describe("Given the API has articles", () => {
  test.describe("when a visitor opens the blog", () => {
    test("then every article is its own section, newest first, with its title and date", async ({
      page,
    }) => {
      await serveArticles(page);

      await page.goto("/blog");

      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("region")).toHaveCount(ARTICLES.length);
      await expect(page.getByRole("heading", { level: 2 })).toHaveText(
        ARTICLES.map(({ title }) => title),
      );
      await expect(page.getByRole("main").locator("time")).toHaveText(
        PUBLISHED_DATES,
      );
    });
  });
});

test.describe("Given the API is slow to answer", () => {
  test.describe("when a visitor opens the blog", () => {
    test("then they see the articles are loading and can use the rest of the page", async ({
      page,
    }) => {
      await neverAnswer(page);

      await page.goto("/blog");

      await expect(page.getByRole("status")).toHaveText("Loading articles…");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
      await navigation(page).getByRole("link", { name: "Portfolio" }).click();
      await expect(page).toHaveURL("/portfolio");
    });
  });

  test.describe("when the visitor leaves before the articles arrive", () => {
    test("then the request is cancelled and the console stays clean", async ({
      page,
    }) => {
      const problems: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error" || message.type() === "warning") {
          problems.push(message.text());
        }
      });
      page.on("pageerror", (error) => problems.push(error.message));
      await neverAnswer(page);
      await page.goto("/blog");
      await expect(page.getByRole("status")).toBeVisible();
      const cancelledRequest = page.waitForEvent("requestfailed", (request) =>
        request.url().endsWith("/api/v1/articles"),
      );

      await navigation(page).getByRole("link", { name: "About me" }).click();

      expect((await cancelledRequest).failure()?.errorText).toBe(
        "net::ERR_ABORTED",
      );
      await expect(page).toHaveURL("/");
      expect(problems).toEqual([]);
    });
  });
});

test.describe("Given the API is down", () => {
  test.describe("when a visitor tries again after it is back up", () => {
    test("then they first see an error, then the articles", async ({
      page,
    }) => {
      let isDown = true;
      await page.route(ARTICLES_URL, (route) =>
        isDown ? route.abort("connectionrefused") : answerWith(route, ARTICLES),
      );
      await page.goto("/blog");

      await expect(page.getByRole("alert")).toHaveText(
        "Sorry, the articles could not be loaded. Please try again.",
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");

      isDown = false;
      await page.getByRole("button", { name: "Try again" }).click();

      await expect(page.getByRole("region")).toHaveCount(ARTICLES.length);
      await expect(page.getByRole("alert")).toBeHidden();
    });
  });
});

test.describe("Given an article with a very long title", () => {
  test.describe("when a visitor reads it on a phone", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then the title wraps and the page never scrolls sideways", async ({
      page,
    }) => {
      await serveArticles(page, [{ ...ARTICLES[0], title: LONG_TITLE }]);
      await page.goto("/blog");
      const title = page.getByRole("heading", { level: 2 });

      await title.scrollIntoViewIfNeeded();

      await expect(title).toHaveText(LONG_TITLE);
      const lineHeight = await title.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).lineHeight),
      );
      expect((await title.boundingBox())?.height).toBeGreaterThan(lineHeight);
      expect(
        await title.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBe(true);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    });
  });
});

test.describe("Given a visitor on a wide screen", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.describe("when they open the blog", () => {
    test("then each article has a calendar page next to it, zig-zagging from side to side", async ({
      page,
    }) => {
      await serveArticles(page);
      await page.goto("/blog");
      await expect(page.getByRole("region")).toHaveCount(ARTICLES.length);
      const sections = await page.getByRole("region").all();
      const lefts: number[] = [];

      for (const section of sections) {
        await section.scrollIntoViewIfNeeded();
        const tile = section.locator("xpath=../following-sibling::div[1]");
        await expect(tile).toBeVisible();
        lefts.push((await section.boundingBox())?.x ?? 0);
      }

      expect(lefts).toHaveLength(ARTICLES.length);
      for (let index = 1; index < lefts.length; index += 1) {
        expect(Math.abs(lefts[index] - lefts[index - 1])).toBeGreaterThan(100);
      }
    });
  });
});
