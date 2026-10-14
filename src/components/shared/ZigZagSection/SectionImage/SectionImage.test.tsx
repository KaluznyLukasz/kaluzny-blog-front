import { render, screen } from "@testing-library/react";
import { CodeXml } from "lucide-react";
import { describe, expect, it } from "vitest";
import SectionImage from "./SectionImage";

describe("<SectionImage />", () => {
  describe("when rendered with an image", () => {
    it("shows the image with its text alternative", () => {
      render(<SectionImage image={{ src: "/me.jpg", alt: "Me at my desk" }} />);

      expect(
        screen.getByRole("img", { name: "Me at my desk" }),
      ).toHaveAttribute("src", "/me.jpg");
    });

    it("loads the image only when it is about to be seen", () => {
      render(<SectionImage image={{ src: "/me.jpg", alt: "Me at my desk" }} />);

      expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });
  });

  describe("when rendered with an app icon", () => {
    it("shows the icon with its text alternative, centred on a tile", () => {
      render(
        <SectionImage
          image={{ src: "/icon.png", alt: "School app icon", isAppIcon: true }}
        />,
      );
      const icon = screen.getByRole("img", { name: "School app icon" });

      expect(icon).toHaveAttribute("src", "/icon.png");
      expect(icon).toHaveAttribute("loading", "lazy");
      expect(icon.parentElement).toHaveClass("items-center", "justify-center");
    });
  });

  describe("when rendered with a decorative image", () => {
    it("hides the image from assistive technologies", () => {
      const { container } = render(
        <SectionImage image={{ src: "/pattern.svg", alt: "" }} />,
      );

      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });
  });

  describe("when rendered with an icon", () => {
    it("shows the icon in a tile hidden from assistive technologies", () => {
      const { container } = render(
        <SectionImage Icon={<CodeXml data-testid="icon" />} />,
      );

      expect(container.querySelector("img")).not.toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
      expect(container.firstChild).toContainElement(screen.getByTestId("icon"));
    });
  });

  describe("when rendered with both an image and an icon", () => {
    it("shows the image only", () => {
      render(
        <SectionImage
          image={{ src: "/me.jpg", alt: "Me at my desk" }}
          Icon={<CodeXml data-testid="icon" />}
        />,
      );

      expect(
        screen.getByRole("img", { name: "Me at my desk" }),
      ).toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });
  });

  describe("when rendered without an image or an icon", () => {
    it("shows a placeholder hidden from assistive technologies", () => {
      const { container } = render(<SectionImage />);

      expect(container.querySelector("img")).not.toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});
