import { expect, type Page, test } from "@playwright/test";
import {
  ARTICLES,
  ARTICLES_URL,
  answerWith,
  COVER_IMAGE_URL,
  COVERED_ARTICLE,
  holdBackImages,
  isLoaded,
  neverAnswer,
  PUBLISHED_DATES,
  serveArticles,
  sizeOf,
} from "./articlesApi";

const TITLE = "Blog · Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const LONG_TITLE = "Wolfeschlegelsteinhausenbergerdorff".repeat(5);

const navigation = (page: Page) =>
  page.getByRole("navigation", { name: "Main" });

const rowOf = (page: Page, title: string) =>
  page.getByRole("region", { name: title }).locator("xpath=../..");

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

test.describe("Given an article with a cover image", () => {
  test.describe("when a visitor opens the blog on a wide screen", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("then the image replaces the calendar page, and the other articles keep theirs", async ({
      page,
    }) => {
      await serveArticles(page);

      await page.goto("/blog");
      await expect(page.getByRole("region")).toHaveCount(ARTICLES.length);
      const covered = rowOf(page, COVERED_ARTICLE.title);
      const image = covered.locator("img");

      await expect(page.getByRole("main").locator("img")).toHaveCount(1);
      await expect(image).toHaveAttribute("src", COVER_IMAGE_URL);
      await expect(image).toHaveAttribute("alt", "");
      await expect(image).toHaveAttribute("loading", "lazy");
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(() => isLoaded(image)).toBe(true);
      await expect(covered.getByText("Apr", { exact: true })).toHaveCount(0);
      await expect(covered.getByText("2", { exact: true })).toHaveCount(0);
      for (const [title, month] of [
        [ARTICLES[1].title, "Feb"],
        [ARTICLES[2].title, "Jan"],
      ]) {
        const row = rowOf(page, title);
        await row.scrollIntoViewIfNeeded();
        await expect(row.getByText(month, { exact: true })).toBeVisible();
        await expect(row.locator("img")).toHaveCount(0);
      }
    });

    test("then the image is on the other side of the text, where a calendar page would be", async ({
      page,
    }) => {
      await serveArticles(page);
      await page.goto("/blog");
      const section = page.getByRole("region", {
        name: COVERED_ARTICLE.title,
      });
      const image = rowOf(page, COVERED_ARTICLE.title).locator("img");

      await image.scrollIntoViewIfNeeded();

      const sectionBox = await section.boundingBox();
      const imageBox = await image.boundingBox();
      expect(sectionBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      // The first article has its text on the right, so its image is on the left.
      expect((imageBox?.x ?? 0) + (imageBox?.width ?? 0)).toBeLessThanOrEqual(
        (sectionBox?.x ?? 0) + 40,
      );
    });
  });

  test.describe("when a visitor opens the blog on a phone", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then the image is shown too, while the calendar pages stay hidden", async ({
      page,
    }) => {
      await serveArticles(page);

      await page.goto("/blog");
      const image = rowOf(page, COVERED_ARTICLE.title).locator("img");
      await image.scrollIntoViewIfNeeded();

      await expect(image).toBeVisible();
      await expect.poll(() => isLoaded(image)).toBe(true);
      await expect(page.getByText("Feb", { exact: true })).toBeHidden();
      await expect(page.getByText("Jan", { exact: true })).toBeHidden();
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    });
  });

  test.describe("when the image is still on its way", () => {
    test("then its place is already kept, a 4 by 3 crop, so nothing moves when it arrives", async ({
      page,
    }) => {
      await serveArticles(page);
      const release = await holdBackImages(page);
      await page.goto("/blog");
      const image = rowOf(page, COVERED_ARTICLE.title).locator("img");
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      expect(await isLoaded(image)).toBe(false);
      const before = await sizeOf(image);

      release();
      await expect.poll(() => isLoaded(image)).toBe(true);

      expect(await sizeOf(image)).toEqual(before);
      expect(before.width / before.height).toBeCloseTo(4 / 3, 1);
    });
  });

  test.describe("when the API is an older one and sends no image fields", () => {
    test("then every article shows its calendar page, as before", async ({
      page,
    }) => {
      await serveArticles(
        page,
        ARTICLES.map(({ imageId, imageUrl, ...article }) => article),
      );

      await page.goto("/blog");

      await expect(page.getByRole("region")).toHaveCount(ARTICLES.length);
      await expect(page.getByRole("main").locator("img")).toHaveCount(0);
    });
  });
});
