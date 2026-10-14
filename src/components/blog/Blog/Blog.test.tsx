import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Blog from "./Blog";
import { BLOG_DESCRIPTION } from "./Blog.constants";

describe("<Blog />", () => {
  describe("when rendered", () => {
    it("shows Blog as the only main heading", () => {
      render(<Blog />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Blog" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      render(<Blog />);

      expect(screen.getByText(BLOG_DESCRIPTION)).toBeInTheDocument();
    });

    it("shows no sections yet", () => {
      render(<Blog />);

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });
});
