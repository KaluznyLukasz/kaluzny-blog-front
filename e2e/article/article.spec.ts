import { expect, type Page, test } from "@playwright/test";
import {
  ARTICLES,
  answerWith,
  answerWithStatus,
  articleUrl,
  serveArticle,
  serveArticles,
} from "../blog/articlesApi";

const TITLE = "Article · Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const LONG_WORD = "Wolfeschlegelsteinhausenbergerdorff".repeat(5);

const ARTICLE = {
  ...ARTICLES[1],
  content:
    "Everything in this project runs in containers, including npm.\n\nIt felt strange for a week and then I stopped caring.\nThat is the whole story.",
};
const OTHER_ARTICLE = {
  ...ARTICLES[2],
  content: "I want a place to write down what I learn.",
};
const LIST = [ARTICLES[0], ARTICLE, OTHER_ARTICLE];
const ARTICLE_PATH = `/articles/${ARTICLE.id}`;
const MISSING_ID = "5e1f0a2b-0001-4000-8000-0000000000ff";

const navigation = (page: Page) =>
  page.getByRole("navigation", { name: "Main" });

const readMore = (page: Page, title: string) =>
  page.getByRole("link", { name: `Read more about ${title}` });

const backToBlog = (page: Page) =>
  page.getByRole("link", { name: "Back to blog" });

const articleHeading = (page: Page) => page.getByRole("heading", { level: 1 });

const serveSite = async (page: Page) => {
  await serveArticles(page, LIST);
  await serveArticle(page, ARTICLE);
  await serveArticle(page, OTHER_ARTICLE);
};

test.describe("Given a visitor on the about me page", () => {
  test.describe("when they go to the blog and open an article", () => {
    test("then the article opens on its own page, without loading the app again", async ({
      page,
    }) => {
      await serveSite(page);
      await page.goto("/");
      await navigation(page).getByRole("link", { name: "Blog" }).click();
      await expect(page).toHaveURL("/blog");
      let documentRequests = 0;
      page.on("request", (request) => {
        if (request.resourceType() === "document") documentRequests += 1;
      });

      await readMore(page, ARTICLE.title).click();

      await expect(page).toHaveURL(ARTICLE_PATH);
      await expect(page).toHaveTitle(TITLE);
      await expect(articleHeading(page)).toHaveText(ARTICLE.title);
      await expect(page.getByRole("main").locator("time")).toHaveText(
        "14 February 2025",
      );
      await expect(page.getByRole("article").locator("p")).toHaveText([
        "Everything in this project runs in containers, including npm.",
        "It felt strange for a week and then I stopped caring.",
        "That is the whole story.",
      ]);
      expect(documentRequests).toBe(0);
    });
  });

  test.describe("when they read the article and use the link back", () => {
    test("then they are on the blog again", async ({ page }) => {
      await serveSite(page);
      await page.goto("/");
      await navigation(page).getByRole("link", { name: "Blog" }).click();
      await readMore(page, ARTICLE.title).click();
      await expect(articleHeading(page)).toHaveText(ARTICLE.title);

      await backToBlog(page).click();

      await expect(page).toHaveURL("/blog");
      await expect(articleHeading(page)).toHaveText("Blog");
      await expect(page.getByRole("region")).toHaveCount(LIST.length);
    });
  });

  test.describe("when they read the article and use the browser's Back button", () => {
    test("then they are back on the blog, and once more on the about me page", async ({
      page,
    }) => {
      await serveSite(page);
      await page.goto("/");
      await navigation(page).getByRole("link", { name: "Blog" }).click();
      await readMore(page, ARTICLE.title).click();
      await expect(articleHeading(page)).toHaveText(ARTICLE.title);

      await page.goBack();

      await expect(page).toHaveURL("/blog");
      await expect(articleHeading(page)).toHaveText("Blog");

      await page.goBack();

      await expect(page).toHaveURL("/");
      await expect(articleHeading(page)).toHaveText("Łukasz Kałużny");
    });
  });
});

test.describe("Given a long blog", () => {
  test.use({ viewport: { width: 1280, height: 600 } });

  test.describe("when a visitor picks an article far down the list", () => {
    test("then the article opens scrolled to the top", async ({ page }) => {
      const articles = Array.from({ length: 12 }, (_, index) => ({
        ...ARTICLE,
        id: `5e1f0a2b-00${String(index).padStart(2, "0")}-4000-8000-0000000000${String(index).padStart(2, "0")}`,
        title: `Article number ${index + 1}`,
      }));
      const last = articles[articles.length - 1];
      await serveArticles(page, articles);
      await serveArticle(page, {
        ...last,
        content: Array.from(
          { length: 60 },
          (_, index) => `Paragraph ${index + 1} of a long article.`,
        ).join("\n\n"),
      });
      await page.goto("/blog");
      await readMore(page, last.title).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(500);

      await readMore(page, last.title).click();

      await expect(articleHeading(page)).toHaveText(last.title);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });
  });
});

test.describe("Given a visitor with a bookmark", () => {
  test.describe("when they open the address of an article directly", () => {
    test("then the article loads without visiting any other page first", async ({
      page,
    }) => {
      const listRequests: string[] = [];
      page.on("request", (request) => {
        if (request.url().endsWith("/api/v1/articles")) {
          listRequests.push(request.url());
        }
      });
      await serveArticle(page, ARTICLE);

      await page.goto(ARTICLE_PATH);

      await expect(page).toHaveTitle(TITLE);
      await expect(articleHeading(page)).toHaveText(ARTICLE.title);
      expect(listRequests).toEqual([]);
    });
  });
});

test.describe("Given a visitor opens an article", () => {
  test.describe("when it appears", () => {
    test("then it fades and slides in and ends fully visible", async ({
      page,
    }) => {
      await serveArticle(page, ARTICLE);

      await page.goto(ARTICLE_PATH);
      const article = page.getByRole("article");

      await expect(article).toHaveCSS("animation-name", "enter");
      await expect(article).toHaveCSS("opacity", "1");
    });

    test("then a very long article is shown too, not left hidden", async ({
      page,
    }) => {
      await serveArticle(page, {
        ...ARTICLE,
        content: Array.from(
          { length: 400 },
          (_, index) => `Paragraph ${index + 1} of a very long article.`,
        ).join("\n\n"),
      });

      await page.goto(ARTICLE_PATH);

      await expect(page.getByRole("article")).toHaveCSS("opacity", "1");
      await expect(articleHeading(page)).toBeInViewport();
    });
  });

  test.describe("when they prefer reduced motion", () => {
    test("then it is shown without an animation", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await serveArticle(page, ARTICLE);

      await page.goto(ARTICLE_PATH);
      const article = page.getByRole("article");

      await expect(article).toHaveCSS("animation-name", "none");
      await expect(article).toHaveCSS("opacity", "1");
    });
  });
});

test.describe("Given the API is slow to answer", () => {
  test.describe("when a visitor opens an article", () => {
    test("then they see it is loading and can still go back", async ({
      page,
    }) => {
      await page.route(articleUrl(ARTICLE.id), () => {});

      await page.goto(ARTICLE_PATH);

      await expect(page.getByRole("status")).toHaveText("Loading article…");
      await expect(backToBlog(page)).toBeVisible();
    });
  });
});

test.describe("Given an article that does not exist", () => {
  test.describe("when a visitor opens its address", () => {
    test("then they are told so and can go back to the blog", async ({
      page,
    }) => {
      await page.route(articleUrl(MISSING_ID), (route) =>
        answerWithStatus(route, 404, {
          message: `Article with id ${MISSING_ID} does not exist.`,
          error: "Not Found",
          statusCode: 404,
        }),
      );
      await serveArticles(page, LIST);

      await page.goto(`/articles/${MISSING_ID}`);

      await expect(articleHeading(page)).toHaveText(
        "This article does not exist",
      );
      await expect(page.getByRole("alert")).toBeHidden();

      await backToBlog(page).click();

      await expect(page).toHaveURL("/blog");
      await expect(page.getByRole("region")).toHaveCount(LIST.length);
    });
  });

  test.describe("when the address has an invalid ID", () => {
    test("then they are told so without the API being asked", async ({
      page,
    }) => {
      const articleRequests: string[] = [];
      page.on("request", (request) => {
        if (request.url().includes("/api/v1/articles")) {
          articleRequests.push(request.url());
        }
      });

      await page.goto("/articles/123");

      await expect(articleHeading(page)).toHaveText(
        "This article does not exist",
      );
      await expect(backToBlog(page)).toBeVisible();
      expect(articleRequests).toEqual([]);
    });
  });
});

test.describe("Given the API is down", () => {
  test.describe("when a visitor tries again after it is back up", () => {
    test("then they first see an error, then the article", async ({ page }) => {
      let isDown = true;
      await page.route(articleUrl(ARTICLE.id), (route) =>
        isDown ? route.abort("connectionrefused") : answerWith(route, ARTICLE),
      );
      await page.goto(ARTICLE_PATH);

      await expect(page.getByRole("alert")).toHaveText(
        "Sorry, the article could not be loaded. Please try again.",
      );
      await expect(backToBlog(page)).toBeVisible();

      isDown = false;
      await page.getByRole("button", { name: "Try again" }).click();

      await expect(articleHeading(page)).toHaveText(ARTICLE.title);
      await expect(page.getByRole("alert")).toBeHidden();
    });
  });
});

test.describe("Given the API answers with an error or a wrong shape", () => {
  const brokenAnswers = [
    [
      "an error",
      (page: Page) =>
        page.route(articleUrl(ARTICLE.id), (route) =>
          answerWithStatus(route, 500, { statusCode: 500 }),
        ),
    ],
    [
      "an article without a title",
      (page: Page) =>
        page.route(articleUrl(ARTICLE.id), (route) =>
          answerWith(route, { ...ARTICLE, title: undefined }),
        ),
    ],
    [
      "a list instead of an article",
      (page: Page) =>
        page.route(articleUrl(ARTICLE.id), (route) => answerWith(route, LIST)),
    ],
  ] as const;

  for (const [name, serve] of brokenAnswers) {
    test.describe(`when it answers with ${name}`, () => {
      test("then the visitor sees an error and a way to try again", async ({
        page,
      }) => {
        await serve(page);

        await page.goto(ARTICLE_PATH);

        await expect(page.getByRole("alert")).toHaveText(
          "Sorry, the article could not be loaded. Please try again.",
        );
        await expect(
          page.getByRole("button", { name: "Try again" }),
        ).toBeVisible();
        await expect(page.getByRole("article")).toBeHidden();
      });
    });
  }
});

test.describe("Given an article with HTML in its content", () => {
  test.describe("when a visitor reads it", () => {
    test("then they see the text and no script ever runs", async ({ page }) => {
      const dialogs: string[] = [];
      page.on("dialog", async (dialog) => {
        dialogs.push(dialog.message());
        await dialog.dismiss();
      });
      const hostile = {
        ...ARTICLE,
        title: "<img src=x onerror=\"window.hacked = 'title'\">Title",
        content: [
          "<script>window.hacked = 'script'; alert('script')</script>",
          "<b>Not bold</b> <img src=x onerror=\"window.hacked = 'img'\">",
          "<a href=\"javascript:window.hacked='link'\">Not a link</a>",
        ].join("\n"),
      };
      await serveArticle(page, hostile);

      await page.goto(ARTICLE_PATH);

      await expect(articleHeading(page)).toHaveText(hostile.title);
      await expect(page.getByRole("article").locator("p")).toHaveText([
        "<script>window.hacked = 'script'; alert('script')</script>",
        "<b>Not bold</b> <img src=x onerror=\"window.hacked = 'img'\">",
        "<a href=\"javascript:window.hacked='link'\">Not a link</a>",
      ]);
      await expect(
        page.getByRole("article").locator("script, b, img, a"),
      ).toHaveCount(0);
      expect(await page.evaluate(() => Reflect.get(window, "hacked"))).toBe(
        undefined,
      );
      expect(dialogs).toEqual([]);
    });
  });
});

test.describe("Given a visitor who reads one article after another", () => {
  test.describe("when they go back to the blog and pick the next one", () => {
    test("then the new article loads and the old one is gone", async ({
      page,
    }) => {
      await serveSite(page);
      await page.goto("/blog");
      await readMore(page, ARTICLE.title).click();
      await expect(articleHeading(page)).toHaveText(ARTICLE.title);

      await backToBlog(page).click();
      await readMore(page, OTHER_ARTICLE.title).click();

      await expect(page).toHaveURL(`/articles/${OTHER_ARTICLE.id}`);
      await expect(articleHeading(page)).toHaveText(OTHER_ARTICLE.title);
      await expect(page.getByText(ARTICLE.title)).toHaveCount(0);
    });
  });
});

test.describe("Given an article with a very long title and a very long word", () => {
  test.describe("when a visitor reads it on a phone", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    test("then the text wraps and the page never scrolls sideways", async ({
      page,
    }) => {
      await serveArticle(page, {
        ...ARTICLE,
        title: LONG_WORD,
        content: `${LONG_WORD}\n\nA normal paragraph.`,
      });

      await page.goto(ARTICLE_PATH);

      await expect(articleHeading(page)).toHaveText(LONG_WORD);
      expect(
        await articleHeading(page).evaluate(
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
