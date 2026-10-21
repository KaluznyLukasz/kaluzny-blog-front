import type { DateTileAccent } from "./DateTile.types";

interface AccentStyle {
  tileClassName: string;
  stripClassName: string;
}

export const CALENDAR_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

export const ACCENT_STYLES: Record<DateTileAccent, AccentStyle> = {
  primary: {
    tileClassName: "from-gi-blue-lightest",
    stripClassName: "bg-gi-primary text-white",
  },
  orange: {
    tileClassName: "from-gi-orange/20",
    stripClassName: "bg-gi-orange text-gi-dark-primary",
  },
  secondary: {
    tileClassName: "from-gi-secondary/15",
    stripClassName: "bg-gi-secondary text-white",
  },
  blue: {
    tileClassName: "from-gi-blue/15",
    stripClassName: "bg-gi-blue text-white",
  },
};
