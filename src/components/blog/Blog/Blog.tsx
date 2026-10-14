import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import { BLOG_DESCRIPTION } from "./Blog.constants";

const Blog = () => {
  return (
    <Reveal>
      <PageHeader title="Blog" description={BLOG_DESCRIPTION} />
    </Reveal>
  );
};

export default Blog;
