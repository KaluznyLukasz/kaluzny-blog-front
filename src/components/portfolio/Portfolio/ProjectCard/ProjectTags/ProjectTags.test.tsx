import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROJECT_TAGS_LABEL } from "../ProjectCard.constants";
import ProjectTags from "./ProjectTags";

describe("<ProjectTags />", () => {
  describe("when rendered with tags", () => {
    it("shows every tag as a list item, in the given order", () => {
      render(<ProjectTags tags={["iOS", "SwiftUI", "Firebase"]} />);

      expect(
        screen.getAllByRole("listitem").map((item) => item.textContent),
      ).toEqual(["iOS", "SwiftUI", "Firebase"]);
    });

    it("names the list for screen readers", () => {
      render(<ProjectTags tags={["iOS"]} />);

      expect(
        within(
          screen.getByRole("list", { name: PROJECT_TAGS_LABEL }),
        ).getByText("iOS"),
      ).toBeInTheDocument();
    });
  });
});
