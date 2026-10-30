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

  describe("when rendered with a status", () => {
    it("shows the status before the description", () => {
      render(
        <ProjectCard
          name="School app"
          description="Our school's app."
          status="live"
        />,
      );

      expect(
        screen
          .getByText("Live")
          .compareDocumentPosition(screen.getByText("Our school's app.")),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe("when rendered without a status", () => {
    it("shows only the description", () => {
      const { container } = render(
        <ProjectCard name="School app" description="Our school's app." />,
      );

      expect(container.firstElementChild?.children).toHaveLength(1);
    });
  });

  describe("when rendered with tags", () => {
    it("shows them after the description and before the links", () => {
      render(
        <ProjectCard
          name="School app"
          description="Our school's app."
          tags={["iOS", "Android"]}
          links={[
            { kind: "app-store", href: "https://apps.apple.com/app/id1" },
          ]}
        />,
      );
      const tags = screen.getByRole("list", {
        name: "Platforms and technologies",
      });

      expect(
        screen.getByText("Our school's app.").compareDocumentPosition(tags),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      expect(
        tags.compareDocumentPosition(
          screen.getByRole("link", { name: "App Store for School app" }),
        ),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
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
