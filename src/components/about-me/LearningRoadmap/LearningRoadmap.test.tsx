import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LearningRoadmap from "./LearningRoadmap";
import type { RoadmapStep } from "./LearningRoadmap.types";

const STEPS: RoadmapStep[] = [
  { title: "Java", description: "School projects.", status: "done" },
  {
    title: "Web",
    description: "React and TypeScript.",
    status: "in-progress",
  },
  { title: "App Store", description: "My first release.", status: "next" },
];

describe("<LearningRoadmap />", () => {
  describe("when rendered with steps", () => {
    it("shows the steps as an ordered list, in the given order", () => {
      render(<LearningRoadmap steps={STEPS} />);

      expect(screen.getByRole("list").tagName).toBe("OL");
      expect(
        screen
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(["Java", "Web", "App Store"]);
    });

    it("shows the description of every step", () => {
      render(<LearningRoadmap steps={STEPS} />);

      for (const { description } of STEPS) {
        expect(screen.getByText(description)).toBeInTheDocument();
      }
    });

    it("names the status of every step in words, not only in colour", () => {
      render(<LearningRoadmap steps={STEPS} />);

      expect(
        screen
          .getAllByRole("listitem")
          .map(
            (item) =>
              within(item).getByText(/Done|In progress|Up next/).textContent,
          ),
      ).toEqual(["Done", "In progress", "Up next"]);
    });

    it("hides the decorative status dots from assistive technologies", () => {
      render(<LearningRoadmap steps={STEPS} />);

      for (const item of screen.getAllByRole("listitem")) {
        expect(item.firstElementChild).toHaveAttribute("aria-hidden", "true");
      }
    });
  });
});
