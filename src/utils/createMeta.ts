import type { MetaDescriptor } from "react-router";
import { SITE_NAME } from "../constants/common";

export const createMeta = (
  title: string,
  description: string,
): MetaDescriptor[] => [
  { title },
  { name: "description", content: description },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
];
