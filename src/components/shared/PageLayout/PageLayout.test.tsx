import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../../../constants/common";
import PageLayout from "./PageLayout";
import { MAIN_CONTENT_ID } from "./PageLayout.constants";

const renderLayout = () =>
  render(
    <MemoryRouter>
      <PageLayout>
        <p>Page content</p>
      </PageLayout>
    </MemoryRouter>,
  );

describe("<PageLayout />", () => {
  describe("when rendered with page content", () => {
    it("shows the content in the main landmark", () => {
      renderLayout();

      expect(screen.getByRole("main")).toContainElement(
        screen.getByText("Page content"),
      );
    });

    it("shows the main navigation", () => {
      renderLayout();

      expect(
        screen.getByRole("navigation", { name: "Main" }),
      ).toBeInTheDocument();
    });
    it("shows the site name", () => {
      renderLayout();

      expect(screen.getByText(SITE_NAME)).toBeInTheDocument();
    });

    it("shows the footer after the content", () => {
      renderLayout();
      const main = screen.getByRole("main");
      const footer = screen.getByRole("contentinfo");

      expect(main.compareDocumentPosition(footer)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
  });

  describe("when a keyboard user starts on the page", () => {
    it("offers a link that skips straight to the content, before anything else", () => {
      renderLayout();
      const skipLink = screen.getAllByRole("link")[0];

      expect(skipLink).toHaveTextContent("Skip to content");
      expect(skipLink).toHaveAttribute("href", `#${MAIN_CONTENT_ID}`);
      expect(screen.getByRole("main")).toHaveAttribute("id", MAIN_CONTENT_ID);
    });
  });
});
