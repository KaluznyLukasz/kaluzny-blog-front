import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillList from "./SkillList";
import { SKILL_REVEAL_STEP } from "./SkillList.constants";

const GROUPS = [
  { title: "Mobile", skills: ["Swift", "Kotlin"] },
  { title: "Web", skills: ["TypeScript", "React", "Docker"] },
];

describe("<SkillList />", () => {
  describe("when rendered with groups of skills", () => {
    it("shows every group under its own heading, in the given order", () => {
      render(<SkillList groups={GROUPS} />);

      expect(
        screen
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(["Mobile", "Web"]);
    });

    it("shows the skills of every group as a list, in the given order", () => {
      render(<SkillList groups={GROUPS} />);

      expect(
        screen.getAllByRole("list").map((list) =>
          within(list)
            .getAllByRole("listitem")
            .map((item) => item.textContent),
        ),
      ).toEqual([
        ["Swift", "Kotlin"],
        ["TypeScript", "React", "Docker"],
      ]);
    });

    it("animates the skills of a group in one after another", () => {
      render(<SkillList groups={GROUPS} />);

      expect(
        within(screen.getAllByRole("list")[1])
          .getAllByRole("listitem")
          .map((item) => (item.firstChild as HTMLElement).style.animationDelay),
      ).toEqual([
        "0ms",
        `${SKILL_REVEAL_STEP}ms`,
        `${2 * SKILL_REVEAL_STEP}ms`,
      ]);
    });
  });
});
