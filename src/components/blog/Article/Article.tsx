import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { BLOG_PATH } from "../../../constants/common";
import RetryMessage from "../../shared/RetryMessage/RetryMessage";
import { ARTICLE_MESSAGES, PLACEHOLDER_LINE_WIDTHS } from "./Article.constants";
import type { ArticleState } from "./Article.types";
import ArticleContent from "./ArticleContent/ArticleContent";
import { useArticle } from "./utils/useArticle";

interface Props {
  id: string;
}

const renderState = (state: ArticleState, onRetry: () => void) => {
  if (state.status === "loading") {
    return (
      <div role="status" className="flex flex-col gap-6">
        <p className="text-center text-gi-dark-gray sm:text-left">
          {ARTICLE_MESSAGES.loading}
        </p>
        <div
          aria-hidden="true"
          className="flex flex-col gap-4 rounded-4xl bg-gi-ash/70 p-6 motion-safe:animate-pulse sm:p-10"
        >
          <span className="h-3 w-1/4 rounded-full bg-gi-dark-ash/60" />
          <span className="h-8 w-2/3 rounded-full bg-gi-dark-ash/60" />
          {PLACEHOLDER_LINE_WIDTHS.map((width, index) => (
            <span
              key={index}
              className={`h-3 rounded-full bg-gi-dark-ash/60 ${width}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="font-extrabold text-3xl text-gi-primary sm:text-4xl">
          {ARTICLE_MESSAGES.notFound}
        </h1>
        <p className="text-gi-dark-gray text-lg">
          {ARTICLE_MESSAGES.notFoundHint}
        </p>
      </div>
    );
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

  return <ArticleContent {...state.article} />;
};

const Article = ({ id }: Props) => {
  const { state, retry } = useArticle(id);

  return (
    <>
      <Link
        to={BLOG_PATH}
        className="inline-flex items-center gap-2 self-center rounded-sm font-medium text-gi-secondary underline underline-offset-4 transition-colors hover:text-gi-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-secondary sm:self-start"
      >
        <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
        {ARTICLE_MESSAGES.back}
      </Link>
      {renderState(state, retry)}
    </>
  );
};

export default Article;
