import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "./ProjectCard";

describe("<ProjectCard />", () => {
  describe("when rendered with a description", () => {
    it("shows the description", () => {
      render(<ProjectCard name="School app" description="Our school's app." />);

      expect(screen.getByText("Our school's app.")).toBeInTheDocument();
    });
  });

  describe("when rendered with store links", () => {
    it("shows every link, named after its store and the project, in the given order", () => {
      render(
        <ProjectCard
          name="School app"
          description="Our school's app."
          links={[
            { kind: "app-store", href: "https://apps.apple.com/app/id1" },
            {
              kind: "google-play",
              href: "https://play.google.com/store/apps/details?id=app",
            },
          ]}
        />,
      );

      expect(
        screen
          .getAllByRole("link")
          .map((link) => [link.textContent, link.getAttribute("href")]),
      ).toEqual([
        ["App Store for School app", "https://apps.apple.com/app/id1"],
        [
          "Google Play for School app",
          "https://play.google.com/store/apps/details?id=app",
        ],
      ]);
    });

    it("shows the links as a list", () => {
      render(
        <ProjectCard
          name="School app"
          description="Our school's app."
          links={[
            { kind: "app-store", href: "https://apps.apple.com/app/id1" },
          ]}
        />,
      );

      expect(screen.getByRole("list")).toContainElement(
        screen.getByRole("link", { name: "App Store for School app" }),
      );
    });
  });

  describe("when rendered without links", () => {
    it("shows no links and no empty list", () => {
      render(<ProjectCard name="School app" description="Our school's app." />);

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});
