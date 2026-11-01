import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusCard from "./StatusCard";

describe("<StatusCard />", () => {
  describe("when rendered with a title and a hint", () => {
    it("shows the title as the main heading", () => {
      render(<StatusCard Icon={<svg />} title="Nothing here" hint="Sorry." />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Nothing here" }),
      ).toBeInTheDocument();
    });

    it("shows the hint", () => {
      render(<StatusCard Icon={<svg />} title="Nothing here" hint="Sorry." />);

      expect(screen.getByText("Sorry.")).toBeVisible();
    });

    it("hides the decorative icon from screen readers", () => {
      render(
        <StatusCard
          Icon={<svg data-testid="icon" />}
          title="Nothing here"
          hint="Sorry."
        />,
      );

      expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("is not announced as an error", () => {
      render(<StatusCard Icon={<svg />} title="Nothing here" hint="Sorry." />);

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("when rendered with actions", () => {
    it("shows them below the hint", () => {
      render(
        <StatusCard Icon={<svg />} title="Nothing here" hint="Sorry.">
          <button type="button">Go back</button>
        </StatusCard>,
      );

      expect(
        screen
          .getByText("Sorry.")
          .compareDocumentPosition(
            screen.getByRole("button", { name: "Go back" }),
          ),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe("when rendered without actions", () => {
    it("shows no empty area for them", () => {
      const { container } = render(
        <StatusCard Icon={<svg />} title="Nothing here" hint="Sorry." />,
      );

      expect(container.firstElementChild?.children).toHaveLength(3);
    });
  });
});
