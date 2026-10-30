import { render, screen } from "@testing-library/react";
import { Code, MapPin } from "lucide-react";
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

  describe("when rendered with a tagline", () => {
    it("shows it", () => {
      render(
        <ProfileHeader
          name="Jan Kowalski"
          role="Intern developer"
          tagline="I build apps."
        />,
      );

      expect(screen.getByText("I build apps.")).toBeInTheDocument();
    });
  });

  describe("when rendered with facts", () => {
    it("shows every fact as a list item with a decorative icon, in order", () => {
      render(
        <ProfileHeader
          name="Jan Kowalski"
          role="Intern developer"
          facts={[
            { Icon: MapPin, label: "Based in Poland" },
            { Icon: Code, label: "Learning Kotlin" },
          ]}
        />,
      );
      const items = screen.getAllByRole("listitem");

      expect(items.map((item) => item.textContent)).toEqual([
        "Based in Poland",
        "Learning Kotlin",
      ]);
      for (const item of items) {
        expect(item.querySelector("svg")).toHaveAttribute(
          "aria-hidden",
          "true",
        );
      }
    });
  });

  describe("when rendered without a tagline and facts", () => {
    it("shows no empty list", () => {
      render(<ProfileHeader name="Jan Kowalski" role="Intern developer" />);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });

  describe("when rendered with actions", () => {
    it("shows them after the role", () => {
      render(
        <ProfileHeader name="Jan Kowalski" role="Intern developer">
          <button type="button">Get in touch</button>
        </ProfileHeader>,
      );

      expect(
        screen
          .getByText("Intern developer")
          .compareDocumentPosition(
            screen.getByRole("button", { name: "Get in touch" }),
          ),
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
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
