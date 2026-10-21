import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DateTile from "./DateTile";
import { ACCENT_STYLES } from "./DateTile.constants";
import type { DateTileAccent } from "./DateTile.types";

const PUBLISHED_AT = "2025-02-14T12:30:00.000Z";

describe("<DateTile />", () => {
  describe("when rendered", () => {
    it("shows the day, month and year like a calendar page", () => {
      render(<DateTile publishedAt={PUBLISHED_AT} accent="primary" />);

      expect(screen.getByText("14")).toBeInTheDocument();
      expect(screen.getByText("Feb")).toBeInTheDocument();
      expect(screen.getByText("2025")).toBeInTheDocument();
    });

    it("is hidden from screen readers, because the section already says the date", () => {
      const { container } = render(
        <DateTile publishedAt={PUBLISHED_AT} accent="primary" />,
      );

      expect(container.firstElementChild).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });

  describe("when given an accent", () => {
    it.each<DateTileAccent>([
      "primary",
      "orange",
      "secondary",
      "blue",
    ])("colours the tile and the month strip with %s", (accent) => {
      const { container } = render(
        <DateTile publishedAt={PUBLISHED_AT} accent={accent} />,
      );
      const { tileClassName, stripClassName } = ACCENT_STYLES[accent];

      expect(container.firstElementChild).toHaveClass(tileClassName);
      expect(screen.getByText("Feb").parentElement).toHaveClass(
        ...stripClassName.split(" "),
      );
    });
  });
});
