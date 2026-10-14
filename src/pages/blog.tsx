import Blog from "../components/blog/Blog/Blog";
import { SITE_NAME } from "../constants/common";
import type { Route } from "./+types/blog";

export const meta: Route.MetaFunction = () => [
  { title: `Blog · ${SITE_NAME}` },
];

const BlogPage = () => {
  return <Blog />;
};

export default BlogPage;
