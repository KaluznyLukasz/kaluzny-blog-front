import type { Page, Route } from "@playwright/test";

export const ARTICLES_URL = "**/api/v1/articles";

export const ARTICLES = [
  {
    id: "5e1f0a2b-0005-4000-8000-000000000005",
    title: "Scenarios are documentation that runs",
    content:
      "A Gherkin scenario describes behaviour in plain words and then checks it against the running app.",
    publishedAt: "2025-04-02T08:15:00.000Z",
  },
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "My first month with Docker",
    content: "Everything in this project runs in containers, including npm.",
    publishedAt: "2025-02-14T12:30:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I started this blog",
    content: "I want a place to write down what I learn.",
    publishedAt: "2025-01-10T09:00:00.000Z",
  },
];

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

export const serveArticles = (page: Page, articles: unknown = ARTICLES) =>
  page.route(ARTICLES_URL, (route) => answerWith(route, articles));

export const neverAnswer = (page: Page) => page.route(ARTICLES_URL, () => {});
