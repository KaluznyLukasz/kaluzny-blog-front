import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { CONTACT_CTA_MESSAGES } from "../../shared/ContactCta/ContactCta.constants";
import AboutMe from "./AboutMe";
import {
  ABOUT_ME_IMAGE,
  HERO_ACTIONS,
  INTRODUCTION,
  PROFILE,
  PROFILE_FACTS,
  ROADMAP,
  SKILL_GROUPS,
  SKILLS,
} from "./AboutMe.constants";

const renderAboutMe = () => render(<AboutMe />, { wrapper: MemoryRouter });

describe("<AboutMe />", () => {
  describe("when rendered", () => {
    it("shows my name as the only main heading", () => {
      renderAboutMe();

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: PROFILE.name }),
      ).toBeInTheDocument();
    });

    it("shows the sections in reading order", () => {
      renderAboutMe();

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual([
        "About me",
        "Tech stack",
        "My journey",
        CONTACT_CTA_MESSAGES.title,
      ]);
    });

    it("shows what I do right below my name", () => {
      renderAboutMe();

      expect(screen.getByText(PROFILE.role)).toBeInTheDocument();
      expect(screen.getByText(PROFILE.tagline)).toBeInTheDocument();
      for (const { label } of PROFILE_FACTS) {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    });

    it("offers two ways to go on, right below my name", () => {
      renderAboutMe();
      const header = screen
        .getByRole("heading", { level: 1 })
        .closest("header") as HTMLElement;

      expect(
        within(header).getByRole("link", { name: HERO_ACTIONS.work }),
      ).toHaveAttribute("href", "/portfolio");
      expect(
        within(header).getByRole("link", { name: HERO_ACTIONS.contact }),
      ).toHaveAttribute("href", "/contact");
    });

    it("invites the visitor to get in touch at the very end", () => {
      renderAboutMe();
      const regions = screen.getAllByRole("region");

      expect(regions.at(-1)).toHaveAccessibleName(CONTACT_CTA_MESSAGES.title);
    });

    it("groups the skills by what they are used for", () => {
      renderAboutMe();
      const section = screen.getByRole("region", { name: "Tech stack" });

      expect(
        within(section)
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(SKILL_GROUPS.map(({ title }) => title));
    });

    it("shows the introduction", () => {
      renderAboutMe();

      for (const paragraph of INTRODUCTION) {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      }
    });

    it("shows every skill", () => {
      renderAboutMe();
      const section = screen.getByRole("region", { name: "Tech stack" });

      expect(within(section).getAllByRole("listitem")).toHaveLength(
        SKILLS.length,
      );
    });

    it("shows every step of my journey", () => {
      renderAboutMe();
      const section = screen.getByRole("region", { name: "My journey" });

      expect(
        within(section)
          .getAllByRole("heading", { level: 3 })
          .map((heading) => heading.textContent),
      ).toEqual(ROADMAP.map(({ title }) => title));
    });

    it("shows my photo in the avatar", () => {
      renderAboutMe();

      expect(
        screen
          .getByRole("img", { name: `${PROFILE.name} avatar` })
          .querySelector("img"),
      ).toHaveAttribute("src", PROFILE.photo);
    });

    it("shows a photo with a text alternative next to the About me section", () => {
      renderAboutMe();
      const photo = screen.getByRole("img", { name: ABOUT_ME_IMAGE.alt });
      const section = screen.getByRole("region", { name: "About me" });

      expect(photo).toHaveAttribute("src", ABOUT_ME_IMAGE.src);
      expect(section).not.toContainElement(photo);
      expect(section.parentElement?.parentElement).toContainElement(photo);
    });

    it("shows a decorative icon next to every other section", () => {
      renderAboutMe();

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
