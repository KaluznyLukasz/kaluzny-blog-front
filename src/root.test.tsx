import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it, vi } from "vitest";
import favicon from "./assets/images/favicon.png";
import { SITE_NAME } from "./constants/common";
import App, { Layout, links, meta } from "./root";

vi.mock("react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-router")>()),
  Meta: () => <meta name="test-meta" />,
  Links: () => <link rel="test-links" />,
  Scripts: () => <div data-mock="scripts" />,
  ScrollRestoration: () => <div data-mock="scroll-restoration" />,
}));

describe("the app root", () => {
  describe("when it is described to the browser", () => {
    it("has the name of the site as the title", () => {
      expect(meta()).toEqual([{ title: SITE_NAME }]);
    });

    it("has a favicon", () => {
      expect(links()).toEqual([
        { rel: "icon", type: "image/png", href: favicon },
      ]);
    });
  });

  describe("when the HTML document is built", () => {
    const html = renderToStaticMarkup(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    it("is an English page that scales on phones, in UTF-8", () => {
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('<meta charSet="utf-8"/>');
      expect(html).toContain(
        '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
      );
    });

    it("puts the page in the body, followed by scroll restoration and the scripts", () => {
      const body = html.slice(html.indexOf("<body>"));

      expect(body).toBe(
        '<body><p>Page content</p><div data-mock="scroll-restoration"></div><div data-mock="scripts"></div></body></html>',
      );
    });

    it("lets the framework fill the head with meta tags and links", () => {
      const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));

      expect(head).toContain('<meta name="test-meta"/>');
      expect(head).toContain('<link rel="test-links"/>');
    });
  });

  describe("when the app is shown", () => {
    it("wraps the current page in the layout of the site", () => {
      const router = createMemoryRouter([
        {
          path: "/",
          Component: App,
          children: [{ index: true, Component: () => <h1>Current page</h1> }],
        },
      ]);

      render(<RouterProvider router={router} />);

      expect(
        screen.getByRole("navigation", { name: "Main" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("main")).toContainElement(
        screen.getByRole("heading", { level: 1, name: "Current page" }),
      );
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });
});
