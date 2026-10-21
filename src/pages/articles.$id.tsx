import { useParams } from "react-router";
import Article from "../components/blog/Article/Article";
import { SITE_NAME } from "../constants/common";
import type { Route } from "./+types/articles.$id";

export const meta = (() => [
  { title: `Article · ${SITE_NAME}` },
]) satisfies Route.MetaFunction;

const ArticlePage = () => {
  const { id = "" } = useParams();

  return <Article id={id} />;
};

export default ArticlePage;
