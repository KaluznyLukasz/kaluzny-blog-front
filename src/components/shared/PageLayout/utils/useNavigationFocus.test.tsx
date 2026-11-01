import { fireEvent, render, screen } from "@testing-library/react";
import { Link, MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";
import { MAIN_CONTENT_ID } from "../PageLayout.constants";
import { useNavigationFocus } from "./useNavigationFocus";

const Page = () => {
  const announcement = useNavigationFocus();

  return (
    <>
      <Link to="/blog">Blog</Link>
      <Link to="#top">Top</Link>
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        Content
      </main>
      <output>{announcement}</output>
    </>
  );
};

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Page />
    </MemoryRouter>,
  );

describe("useNavigationFocus", () => {
  afterEach(() => {
    document.title = "";
  });

  describe("when the page first opens", () => {
    it("leaves focus and announces nothing", () => {
      document.title = "Home";
      renderAt("/");

      expect(screen.getByRole("main")).not.toHaveFocus();
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });
  });

  describe("when the visitor goes to another page", () => {
    it("moves focus to the main content", () => {
      renderAt("/");
      const link = screen.getByRole("link", { name: "Blog" });

      link.focus();
      fireEvent.click(link);

      expect(screen.getByRole("main")).toHaveFocus();
    });

    it("announces the title of the new page", () => {
      renderAt("/");
      document.title = "Blog · Site";

      fireEvent.click(screen.getByRole("link", { name: "Blog" }));

      expect(screen.getByRole("status")).toHaveTextContent("Blog · Site");
    });
  });

  describe("when only the part of the page changes, as with a skip link", () => {
    it("leaves focus where the browser put it", () => {
      renderAt("/");
      const link = screen.getByRole("link", { name: "Top" });

      link.focus();
      fireEvent.click(link);

      expect(link).toHaveFocus();
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
    });
  });
});
