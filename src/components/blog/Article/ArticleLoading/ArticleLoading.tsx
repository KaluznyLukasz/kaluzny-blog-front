import { ARTICLE_MESSAGES } from "../Article.constants";
import { PLACEHOLDER_LINE_WIDTHS } from "./ArticleLoading.constants";

const ArticleLoading = () => {
  return (
    <div role="status" className="flex flex-col gap-4">
      <p className="text-center text-gi-dark-gray sm:text-left">
        {ARTICLE_MESSAGES.loading}
      </p>
      <div
        aria-hidden="true"
        className="flex flex-col overflow-hidden rounded-4xl border border-gi-ash bg-background/60 motion-safe:animate-pulse"
      >
        <div className="flex flex-col gap-5 border-gi-ash border-b bg-gi-blue-lightest/60 px-6 py-8 sm:px-12 sm:py-12">
          <div className="flex gap-2">
            <span className="h-7 w-36 rounded-full bg-gi-dark-ash/60" />
            <span className="h-7 w-24 rounded-full bg-gi-dark-ash/40" />
          </div>
          <span className="h-9 w-3/4 rounded-full bg-gi-dark-ash/60 sm:h-12" />
        </div>
        <div className="flex flex-col gap-4 px-6 py-8 sm:px-12 sm:py-12">
          {PLACEHOLDER_LINE_WIDTHS.map((width, index) => (
            <span
              key={index}
              className={`h-4 rounded-full bg-gi-ash ${width}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleLoading;
