import { render, screen } from "@testing-library/react";
import { CodeXml } from "lucide-react";
import { describe, expect, it } from "vitest";
import ZigZagSection from "./ZigZagSection";

const getRow = () =>
  screen.getByRole("region", { name: "About me" }).parentElement?.parentElement;

describe("<ZigZagSection />", () => {
  describe("when rendered with a title and content", () => {
    it("shows a section named by its title", () => {
      render(
        <ZigZagSection title="About me" side="left">
          <p>Hello</p>
        </ZigZagSection>,
      );

      expect(
        screen.getByRole("region", { name: "About me" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "About me" }),
      ).toBeInTheDocument();
    });

    it("shows the content inside the section", () => {
      render(
        <ZigZagSection title="About me" side="left">
          <p>Hello</p>
        </ZigZagSection>,
      );

      expect(screen.getByRole("region", { name: "About me" })).toContainElement(
        screen.getByText("Hello"),
      );
    });
  });

  describe("when placed on the left", () => {
    it("keeps the section on the left and the image on the right", () => {
      render(
        <ZigZagSection title="About me" side="left">
          <p>Hello</p>
        </ZigZagSection>,
      );

      expect(getRow()).not.toHaveClass("lg:flex-row-reverse");
    });
  });

  describe("when placed on the right", () => {
    it("moves the section to the right and the image to the left on wide screens", () => {
      render(
        <ZigZagSection title="About me" side="right">
          <p>Hello</p>
        </ZigZagSection>,
      );

      expect(getRow()).toHaveClass("lg:flex-row-reverse");
    });
  });

  describe("when rendered with an image", () => {
    it("shows the image next to the section, outside of it", () => {
      render(
        <ZigZagSection
          title="About me"
          side="left"
          image={{ src: "/me.jpg", alt: "Me at my desk" }}
        >
          <p>Hello</p>
        </ZigZagSection>,
      );
      const image = screen.getByRole("img", { name: "Me at my desk" });

      expect(getRow()).toContainElement(image);
      expect(
        screen.getByRole("region", { name: "About me" }),
      ).not.toContainElement(image);
    });

    it("shows the image on every screen size", () => {
      render(
        <ZigZagSection
          title="About me"
          side="left"
          image={{ src: "/me.jpg", alt: "Me at my desk" }}
        >
          <p>Hello</p>
        </ZigZagSection>,
      );

      expect(
        screen.getByRole("img", { name: "Me at my desk" }).parentElement,
      ).not.toHaveClass("hidden");
    });
  });

  describe("when rendered without an image", () => {
    it("keeps a place for one, shown on wide screens only", () => {
      render(
        <ZigZagSection title="About me" side="left">
          <p>Hello</p>
        </ZigZagSection>,
      );
      const placeholder = getRow()?.querySelector("[aria-hidden='true']");

      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(placeholder?.parentElement).toHaveClass("hidden", "lg:block");
    });
  });

  describe("when rendered with an icon instead of an image", () => {
    it("shows the icon next to the section, on wide screens only", () => {
      render(
        <ZigZagSection
          title="About me"
          side="left"
          Icon={<CodeXml data-testid="icon" />}
        >
          <p>Hello</p>
        </ZigZagSection>,
      );
      const icon = screen.getByTestId("icon");

      expect(
        screen.getByRole("region", { name: "About me" }),
      ).not.toContainElement(icon);
      expect(icon.parentElement?.parentElement).toHaveClass(
        "hidden",
        "lg:block",
      );
    });
  });
});
