import type { Locator, Page, Route } from "@playwright/test";

export const ARTICLES_URL = "**/api/v1/articles";

export const IMAGES_URL = "**/api/v1/images/*";

export const COVER_IMAGE_ID = "616ad187-7d8e-4e85-912d-36c743357d1a";

export const COVER_IMAGE_URL = `http://localhost/api/v1/images/${COVER_IMAGE_ID}`;

// A square 8x8 picture, so a test can tell that the page crops it to its own shape.
const COVER_IMAGE_BODY = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAgElEQVR4nA3JIQFFMQhA0Z/k1VgNNA1oMI2hwczMNTSgAZpOf8ee36csRRRTXLlKKaP8PmMZYpjhxjXKGHuxWRvZ2MY3d1Ob2S+CFUhggQc3qGDixWEd5GAHP9xDHea8SFYiiSWe3KSSyRfFKqSwwotbVDH1olmNNNZ4c5tqpvkDrcJpAaoLHOMAAAAASUVORK5CYII=",
  "base64",
);

export const ARTICLES = [
  {
    id: "5e1f0a2b-0005-4000-8000-000000000005",
    title: "Scenarios are documentation that runs",
    content:
      "A Gherkin scenario describes behaviour in plain words and then checks it against the running app.",
    publishedAt: "2025-04-02T08:15:00.000Z",
    imageId: COVER_IMAGE_ID,
    imageUrl: COVER_IMAGE_URL,
  },
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "My first month with Docker",
    content: "Everything in this project runs in containers, including npm.",
    publishedAt: "2025-02-14T12:30:00.000Z",
    imageId: null,
    imageUrl: null,
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I started this blog",
    content: "I want a place to write down what I learn.",
    publishedAt: "2025-01-10T09:00:00.000Z",
    imageId: null,
    imageUrl: null,
  },
];

export const COVERED_ARTICLE = ARTICLES[0];

export const PUBLISHED_DATES = [
  "2 April 2025",
  "14 February 2025",
  "10 January 2025",
];

export const answerWith = (route: Route, articles: unknown) =>
  route.fulfill({
    json: articles,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

export const answerWithCoverImage = (route: Route) =>
  route.fulfill({ body: COVER_IMAGE_BODY, contentType: "image/png" });

export const serveImages = (page: Page) =>
  page.route(IMAGES_URL, answerWithCoverImage);

export const serveArticles = async (
  page: Page,
  articles: unknown = ARTICLES,
) => {
  await serveImages(page);
  await page.route(ARTICLES_URL, (route) => answerWith(route, articles));
};

export const neverAnswer = (page: Page) => page.route(ARTICLES_URL, () => {});

export const articleUrl = (id: string) => `**/api/v1/articles/${id}`;

export const serveArticle = async <Article extends { id: string }>(
  page: Page,
  article: Article,
) => {
  await serveImages(page);
  await page.route(articleUrl(article.id), (route) =>
    answerWith(route, article),
  );
};

export const answerWithStatus = (route: Route, status: number, body: unknown) =>
  route.fulfill({
    status,
    json: body,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

export const isLoaded = (image: Locator) =>
  image.evaluate(
    (element: HTMLImageElement) => element.complete && element.naturalWidth > 0,
  );

export const sizeOf = (image: Locator) =>
  image.evaluate((element: HTMLElement) => ({
    width: element.offsetWidth,
    height: element.offsetHeight,
  }));

// Holds back the pictures until the test lets them go, to see the page before they arrive.
export const holdBackImages = async (page: Page) => {
  let release: () => void = () => {};
  const released = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(IMAGES_URL, async (route) => {
    await released;
    await answerWithCoverImage(route);
  });
  return release;
};
