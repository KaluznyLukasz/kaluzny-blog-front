import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillList from "./SkillList";
import { SKILL_REVEAL_STEP } from "./SkillList.constants";

describe("<SkillList />", () => {
  describe("when rendered with skills", () => {
    it("shows every skill as a list item, in the given order", () => {
      render(<SkillList skills={["TypeScript", "React", "Docker"]} />);

      expect(
        screen.getAllByRole("listitem").map((item) => item.textContent),
      ).toEqual(["TypeScript", "React", "Docker"]);
    });

    it("animates the skills in one after another", () => {
      render(<SkillList skills={["TypeScript", "React", "Docker"]} />);

      expect(
        screen
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
