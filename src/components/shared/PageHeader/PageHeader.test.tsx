import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "./PageHeader";

describe("<PageHeader />", () => {
  describe("when rendered with a title and a description", () => {
    it("shows the title as the main heading", () => {
      render(<PageHeader title="Portfolio" description="What I have built." />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Portfolio" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      render(<PageHeader title="Portfolio" description="What I have built." />);

      expect(screen.getByText("What I have built.")).toBeInTheDocument();
    });
  });
});
