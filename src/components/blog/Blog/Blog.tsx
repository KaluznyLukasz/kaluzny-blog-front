import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import ArticleFeed from "./ArticleFeed/ArticleFeed";
import { BLOG_DESCRIPTION } from "./Blog.constants";
import { useArticles } from "./utils/useArticles";

const Blog = () => {
  const { state, retry } = useArticles();

  return (
    <>
      <Reveal>
        <PageHeader title="Blog" description={BLOG_DESCRIPTION} />
      </Reveal>
      <ArticleFeed state={state} onRetry={retry} />
    </>
  );
};

export default Blog;
