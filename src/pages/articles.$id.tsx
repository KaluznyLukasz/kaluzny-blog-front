import { useParams } from "react-router";
import Article from "../components/blog/Article/Article";
import { BLOG_DESCRIPTION } from "../components/blog/Blog/Blog.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/articles.$id";

export const meta = (() =>
  createMeta(
    `Article · ${SITE_NAME}`,
    BLOG_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const ArticlePage = () => {
  const { id = "" } = useParams();

  return <Article id={id} />;
};

export default ArticlePage;
