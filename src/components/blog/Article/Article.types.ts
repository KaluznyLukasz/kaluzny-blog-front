import type { Article } from "../../../services/api/schemas/article";

export type ArticleState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error" }
  | { status: "success"; article: Article };
