import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { BLOG_PATH } from "../../../constants/common";
import RetryMessage from "../../shared/RetryMessage/RetryMessage";
import { ARTICLE_MESSAGES } from "./Article.constants";
import type { ArticleState } from "./Article.types";
import ArticleContent from "./ArticleContent/ArticleContent";
import ArticleLoading from "./ArticleLoading/ArticleLoading";
import ArticleNotFound from "./ArticleNotFound/ArticleNotFound";
import { useArticle } from "./utils/useArticle";

interface Props {
  id: string;
}

const renderState = (state: ArticleState, onRetry: () => void) => {
  if (state.status === "loading") {
    return <ArticleLoading />;
  }

  if (state.status === "not-found") {
    return <ArticleNotFound />;
  }

  if (state.status === "error") {
    return (
      <RetryMessage
        message={ARTICLE_MESSAGES.error}
        retryLabel={ARTICLE_MESSAGES.retry}
        onRetry={onRetry}
      />
    );
  }

  return (
    <>
      <ArticleContent {...state.article} />
      <Link
        to={BLOG_PATH}
        className="inline-flex items-center gap-2 self-center rounded-full bg-gi-primary px-6 py-3 font-medium text-white transition-colors hover:bg-gi-primary-hover focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
      >
        <BookOpen aria-hidden="true" className="size-4 shrink-0" />
        {ARTICLE_MESSAGES.more}
      </Link>
    </>
  );
};

const Article = ({ id }: Props) => {
  const { state, retry } = useArticle(id);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8">
      <Link
        to={BLOG_PATH}
        className="group inline-flex items-center gap-2 self-center rounded-sm font-medium text-gi-secondary underline underline-offset-4 transition-colors hover:text-gi-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-secondary sm:self-start"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
        />
        {ARTICLE_MESSAGES.back}
      </Link>
      {renderState(state, retry)}
    </div>
  );
};

export default Article;
