import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutMe from "./AboutMe";
import {
  ABOUT_ME_IMAGE,
  INTRODUCTION,
  PROFILE,
  ROADMAP,
  SKILLS,
} from "./AboutMe.constants";

describe("<AboutMe />", () => {
  describe("when rendered", () => {
    it("shows my name as the only main heading", () => {
      render(<AboutMe />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: PROFILE.name }),
      ).toBeInTheDocument();
    });

    it("shows the sections in reading order", () => {
      render(<AboutMe />);

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(["About me", "Tech stack", "My journey"]);
    });

    it("shows the introduction", () => {
      render(<AboutMe />);

      for (const paragraph of INTRODUCTION) {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      }
    });

    it("shows every skill", () => {
      render(<AboutMe />);
      const section = screen.getByRole("region", { name: "Tech stack" });

      expect(within(section).getAllByRole("listitem")).toHaveLength(
        SKILLS.length,
      );
    });

    it("shows every step of my journey", () => {
      render(<AboutMe />);
      const section = screen.getByRole("region", { name: "My journey" });

      expect(
        within(section)
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(ROADMAP.map(({ title }) => title));
    });

    it("shows my photo in the avatar", () => {
      render(<AboutMe />);

      expect(
        screen
          .getByRole("img", { name: `${PROFILE.name} avatar` })
          .querySelector("img"),
      ).toHaveAttribute("src", PROFILE.photo);
    });

    it("shows a photo with a text alternative next to the About me section", () => {
      render(<AboutMe />);
      const photo = screen.getByRole("img", { name: ABOUT_ME_IMAGE.alt });
      const section = screen.getByRole("region", { name: "About me" });

      expect(photo).toHaveAttribute("src", ABOUT_ME_IMAGE.src);
      expect(section).not.toContainElement(photo);
      expect(section.parentElement?.parentElement).toContainElement(photo);
    });

    it("shows a decorative icon next to every other section", () => {
      render(<AboutMe />);

      for (const name of ["Tech stack", "My journey"]) {
        const row = screen.getByRole("region", { name }).parentElement
          ?.parentElement;
        const iconTile = row?.lastElementChild?.firstElementChild;

        expect(iconTile).toHaveAttribute("aria-hidden", "true");
        expect(iconTile?.querySelector("svg")).toBeInTheDocument();
      }
    });
  });
});
