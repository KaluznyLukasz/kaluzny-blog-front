import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import {
  ARTICLES,
  ARTICLES_URL,
  answerWith,
  answerWithStatus,
  articleUrl,
  neverAnswer,
  serveArticle,
  serveArticles,
} from "../blog/articlesApi";

const PHONE = { width: 360, height: 800 };
const DESKTOP = { width: 1280, height: 800 };
// A 1280 × 720 screen zoomed in to 400 %
const ZOOMED_IN = { width: 320, height: 180 };
const NARROWEST = { width: 320, height: 800 };
const WCAG_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
];
// The text spacing a visitor may set (WCAG 1.4.12)
const WIDE_TEXT_SPACING = `
  * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
  p { margin-bottom: 2em !important; }
`;
const ARTICLE = ARTICLES[0];
const ARTICLE_PATH = `/articles/${ARTICLE.id}`;

interface Screen {
  name: string;
  open: (page: Page) => Promise<void>;
}

const openAndWaitFor = async (
  page: Page,
  path: string,
  ready: (page: Page) => ReturnType<Page["getByRole"]>,
) => {
  await page.goto(path);
  await expect(ready(page)).toBeVisible();
};

const mainHeading = (page: Page) => page.getByRole("heading", { level: 1 });

const alert = (page: Page) => page.getByRole("alert");

const SCREENS: Screen[] = [
  {
    name: "the home page",
    open: (page) => openAndWaitFor(page, "/", mainHeading),
  },
  {
    name: "the portfolio",
    open: (page) => openAndWaitFor(page, "/portfolio", mainHeading),
  },
  {
    name: "the contact page",
    open: (page) => openAndWaitFor(page, "/contact", mainHeading),
  },
  {
    name: "an unknown address",
    open: (page) => openAndWaitFor(page, "/no-such-page", mainHeading),
  },
  {
    name: "the blog",
    open: async (page) => {
      await serveArticles(page);
      await openAndWaitFor(page, "/blog", (current) =>
        current.getByRole("link", { name: /^Read more/ }).first(),
      );
    },
  },
  {
    name: "the blog while it loads",
    open: async (page) => {
      await neverAnswer(page);
      await openAndWaitFor(page, "/blog", (current) =>
        current.getByRole("status"),
      );
    },
  },
  {
    name: "the blog without articles",
    open: async (page) => {
      await serveArticles(page, []);
      await openAndWaitFor(page, "/blog", (current) =>
        current.getByRole("status"),
      );
    },
  },
  {
    name: "the blog when the API fails",
    open: async (page) => {
      await page.route(ARTICLES_URL, (route) =>
        answerWithStatus(route, 500, {}),
      );
      await openAndWaitFor(page, "/blog", alert);
    },
  },
  {
    name: "an article",
    open: async (page) => {
      await serveArticle(page, ARTICLE);
      await openAndWaitFor(page, ARTICLE_PATH, (current) =>
        current.getByRole("article"),
      );
    },
  },
  {
    name: "an article while it loads",
    open: async (page) => {
      await page.route(articleUrl(ARTICLE.id), () => {});
      await openAndWaitFor(page, ARTICLE_PATH, (current) =>
        current.getByRole("status"),
      );
    },
  },
  {
    name: "an article that does not exist",
    open: async (page) => {
      await page.route(articleUrl(ARTICLE.id), (route) =>
        answerWithStatus(route, 404, {}),
      );
      await openAndWaitFor(page, ARTICLE_PATH, mainHeading);
    },
  },
  {
    name: "an article when the API fails",
    open: async (page) => {
      await page.route(articleUrl(ARTICLE.id), (route) =>
        answerWithStatus(route, 500, {}),
      );
      await openAndWaitFor(page, ARTICLE_PATH, alert);
    },
  },
];

const findViolations = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();

  return violations.flatMap(({ id, nodes }) =>
    nodes.map(({ target }) => `${id}: ${target.join(" ")}`),
  );
};

const scrollThroughThePage = async (page: Page) => {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const step = (await page.evaluate(() => window.innerHeight)) / 2;

  for (let top = 0; top <= height; top += step) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await page.waitForTimeout(50);
  }
};

// How see-through each heading is, counting every element around it
const headingOpacities = (page: Page) =>
  page.getByRole("main").evaluate((main) =>
    Array.from(main.querySelectorAll("h1, h2, h3")).map((heading) => {
      let opacity = 1;
      for (
        let element: Element | null = heading;
        element;
        element = element.parentElement
      ) {
        opacity *= Number(getComputedStyle(element).opacity);
      }
      return `${heading.textContent}: ${opacity}`;
    }),
  );

for (const viewport of [DESKTOP, PHONE]) {
  test.describe(`Given a visitor on a ${viewport.width} px wide screen`, () => {
    test.use({ viewport });

    for (const { name, open } of SCREENS) {
      test.describe(`when they open ${name}`, () => {
        test("then automated checks find no accessibility problems", async ({
          page,
        }) => {
          await page.emulateMedia({ reducedMotion: "reduce" });
          await open(page);

          expect(await findViolations(page)).toEqual([]);
        });
      });
    }
  });
}

test.describe("Given a keyboard user", () => {
  for (const { name, open } of SCREENS) {
    test.describe(`when they press Tab through ${name}`, () => {
      test("then every link and button is reached, in order, with a visible focus outline", async ({
        page,
      }) => {
        await open(page);
        const focusables = page.locator("a[href], button:not([disabled])");
        const count = await focusables.count();

        for (let index = 0; index < count; index += 1) {
          await page.keyboard.press("Tab");
          const element = focusables.nth(index);

          await expect(element).toBeFocused();
          await expect(element).not.toHaveCSS("outline-style", "none");
          await expect(element).not.toHaveCSS("outline-width", "0px");
        }
      });
    });
  }

  test.describe("when they follow a link in the navigation", () => {
    test("then focus moves to the new page, and its title is announced", async ({
      page,
    }) => {
      await openAndWaitFor(page, "/", mainHeading);
      const portfolio = page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Portfolio" });

      await portfolio.focus();
      await page.keyboard.press("Enter");

      await expect(page).toHaveURL("/portfolio");
      await expect(page.getByRole("main")).toBeFocused();
      await expect(
        page.getByText("Portfolio · Łukasz Kałużny"),
      ).toHaveAttribute("aria-live", "polite");

      await page.keyboard.press("Tab");

      await expect(
        page.getByRole("main").getByRole("link").first(),
      ).toBeFocused();
    });
  });

  test.describe("when they try again after the blog failed to load", () => {
    test("then focus stays on the page instead of being lost", async ({
      page,
    }) => {
      let isDown = true;
      await page.route(ARTICLES_URL, (route) =>
        isDown ? answerWithStatus(route, 500, {}) : answerWith(route, ARTICLES),
      );
      await openAndWaitFor(page, "/blog", alert);
      isDown = false;

      await page.getByRole("button", { name: "Try again" }).focus();
      await page.keyboard.press("Enter");

      await expect(
        page.getByRole("link", { name: /^Read more/ }).first(),
      ).toBeVisible();
      await expect(page.getByRole("main")).toBeFocused();
    });
  });
});

test.describe("Given a visitor who zooms in to 400 %", () => {
  test.use({ viewport: ZOOMED_IN });

  for (const path of ["/", "/portfolio", "/blog", "/contact"]) {
    test.describe(`when they scroll through ${path}`, () => {
      test("then every section becomes fully visible, however tall it is", async ({
        page,
      }) => {
        await serveArticles(page);
        await openAndWaitFor(page, path, mainHeading);

        await scrollThroughThePage(page);

        await expect
          .poll(async () =>
            (await headingOpacities(page)).filter(
              (heading) => !heading.endsWith(": 1"),
            ),
          )
          .toEqual([]);
      });
    });
  }
});

test.describe("Given a visitor who needs wider text spacing", () => {
  test.use({ viewport: NARROWEST });

  test.describe("when they open the site on a 320 px wide screen", () => {
    test("then every navigation link stays on screen and nothing scrolls sideways", async ({
      page,
    }) => {
      await openAndWaitFor(page, "/", mainHeading);
      await page.addStyleTag({ content: WIDE_TEXT_SPACING });

      for (const link of await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link")
        .all()) {
        await expect(link).toBeInViewport({ ratio: 1 });
      }
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

test.describe("Given a visitor who uses a high contrast theme", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
  });

  test.describe("when they look at the navigation", () => {
    test("then the current page is still marked, with an underline", async ({
      page,
    }) => {
      await openAndWaitFor(page, "/", mainHeading);
      const navigation = page.getByRole("navigation", { name: "Main" });

      await expect(
        navigation.getByRole("link", { name: "About me" }),
      ).toHaveCSS("text-decoration-line", "underline");
      await expect(
        navigation.getByRole("link", { name: "Portfolio" }),
      ).toHaveCSS("text-decoration-line", "none");
    });
  });

  test.describe("when they read an article", () => {
    test("then the copy link button has an outline, so it looks like a button", async ({
      page,
    }) => {
      await serveArticle(page, ARTICLE);
      await openAndWaitFor(page, ARTICLE_PATH, (current) =>
        current.getByRole("article"),
      );
      const button = page.getByRole("button", { name: "Copy link" });

      await expect(button).toHaveCSS("border-top-style", "solid");
      await expect(button).toHaveCSS("border-top-width", "1px");
    });
  });
});
