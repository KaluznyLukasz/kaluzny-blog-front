import type { ZigZagSide } from "../../../shared/ZigZagSection/ZigZagSection.types";
import type { DateTileAccent } from "./ArticleSection/DateTile/DateTile.types";

export const FEED_MESSAGES = {
  loading: "Loading articles…",
  empty: "There are no articles yet. Check back soon!",
  error: "Sorry, the articles could not be loaded. Please try again.",
  retry: "Try again",
};

export const ACCENT_ORDER: DateTileAccent[] = [
  "primary",
  "orange",
  "secondary",
  "blue",
];

export const PLACEHOLDER_SIDES: ZigZagSide[] = ["right", "left"];
