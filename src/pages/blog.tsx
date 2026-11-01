import Blog from "../components/blog/Blog/Blog";
import { BLOG_DESCRIPTION } from "../components/blog/Blog/Blog.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/blog";

export const meta = (() =>
  createMeta(
    `Blog · ${SITE_NAME}`,
    BLOG_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const BlogPage = () => {
  return <Blog />;
};

export default BlogPage;
