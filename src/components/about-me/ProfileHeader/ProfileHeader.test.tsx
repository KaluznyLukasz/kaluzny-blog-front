import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProfileHeader from "./ProfileHeader";

describe("<ProfileHeader />", () => {
  describe("when rendered with a name and a role", () => {
    it("shows the name as the main heading", () => {
      render(<ProfileHeader name="Jan Kowalski" role="Intern developer" />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Jan Kowalski" }),
      ).toBeInTheDocument();
    });

    it("shows the role", () => {
      render(<ProfileHeader name="Jan Kowalski" role="Intern developer" />);

      expect(screen.getByText("Intern developer")).toBeInTheDocument();
    });

    it("shows an avatar with the initials and a text alternative", () => {
      render(<ProfileHeader name="Jan Kowalski" role="Intern developer" />);

      expect(
        screen.getByRole("img", { name: "Jan Kowalski avatar" }),
      ).toHaveTextContent("JK");
    });
  });

  describe("when rendered with a photo", () => {
    it("shows the photo in the avatar, still named for screen readers", () => {
      render(
        <ProfileHeader
          name="Jan Kowalski"
          role="Intern developer"
          photo="/jan.jpg"
        />,
      );
      const avatar = screen.getByRole("img", { name: "Jan Kowalski avatar" });

      expect(avatar.querySelector("img")).toHaveAttribute("src", "/jan.jpg");
      expect(avatar).not.toHaveTextContent("JK");
    });
  });

  describe("when the name is a very long word", () => {
    it("shows the whole name in the heading", () => {
      const longName =
        "Wolfeschlegelsteinhausenbergerdorffwelchevoralternwarengewissenhaft";

      render(<ProfileHeader name={longName} role="Intern developer" />);

      expect(
        screen.getByRole("heading", { level: 1, name: longName }),
      ).toBeInTheDocument();
    });
  });
});
