import Blog from "../components/blog/Blog/Blog";
import { SITE_NAME } from "../constants/common";
import type { Route } from "./+types/blog";

export const meta = (() => [
  { title: `Blog · ${SITE_NAME}` },
]) satisfies Route.MetaFunction;

const BlogPage = () => {
  return <Blog />;
};

export default BlogPage;
