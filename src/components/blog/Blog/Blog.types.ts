import type { Article } from "../../../services/api/schemas/article";

export type ArticlesState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; articles: Article[] };
