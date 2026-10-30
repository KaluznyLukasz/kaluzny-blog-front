import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import ButtonLink from "./ButtonLink";

const renderButtonLink = (element: React.ReactNode) => {
  const router = createMemoryRouter([
    { path: "/", element },
    { path: "/portfolio", element: <h1>Portfolio</h1> },
  ]);
  render(<RouterProvider router={router} />);

  return router;
};

describe("<ButtonLink />", () => {
  describe("when rendered with a label", () => {
    it("shows a link to the page, named after the label", () => {
      renderButtonLink(<ButtonLink to="/portfolio">View my work</ButtonLink>);

      expect(
        screen.getByRole("link", { name: "View my work" }),
      ).toHaveAttribute("href", "/portfolio");
    });

    it("opens the page without reloading when it is chosen", () => {
      const router = renderButtonLink(
        <ButtonLink to="/portfolio">View my work</ButtonLink>,
      );

      fireEvent.click(screen.getByRole("link", { name: "View my work" }));

      expect(router.state.location.pathname).toBe("/portfolio");
    });
  });

  describe("when rendered with icons", () => {
    it("hides them from screen readers, so the link is named by the label only", () => {
      renderButtonLink(
        <ButtonLink
          to="/portfolio"
          LeftIcon={<svg data-testid="left" />}
          RightIcon={<svg data-testid="right" />}
        >
          View my work
        </ButtonLink>,
      );

      expect(screen.getByRole("link", { name: "View my work" })).toBeVisible();
      expect(screen.getByTestId("left").parentElement).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(screen.getByTestId("right").parentElement).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });

  describe("when rendered without icons", () => {
    it("shows only the label", () => {
      renderButtonLink(<ButtonLink to="/portfolio">View my work</ButtonLink>);

      expect(screen.getByRole("link")).toHaveTextContent(/^View my work$/);
      expect(screen.getByRole("link").querySelector("span")).toBeNull();
    });
  });

  describe("when rendered with a variant", () => {
    it("is filled by default and only outlined when asked", () => {
      renderButtonLink(
        <>
          <ButtonLink to="/portfolio">Filled</ButtonLink>
          <ButtonLink to="/portfolio" variant="outlined">
            Outlined
          </ButtonLink>
        </>,
      );

      expect(screen.getByRole("link", { name: "Filled" })).toHaveClass(
        "bg-gi-primary",
      );
      expect(screen.getByRole("link", { name: "Outlined" })).not.toHaveClass(
        "bg-gi-primary",
      );
    });

    it("can be white, to stand out on a dark background", () => {
      renderButtonLink(
        <ButtonLink to="/portfolio" variant="inverted">
          White
        </ButtonLink>,
      );

      expect(screen.getByRole("link", { name: "White" })).toHaveClass(
        "bg-white",
      );
    });

    it("lets the caller add its own classes", () => {
      renderButtonLink(
        <ButtonLink to="/portfolio" className="w-full">
          Wide
        </ButtonLink>,
      );

      expect(screen.getByRole("link", { name: "Wide" })).toHaveClass("w-full");
    });
  });
});
