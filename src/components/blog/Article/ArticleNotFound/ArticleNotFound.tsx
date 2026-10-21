import { SearchX } from "lucide-react";
import { ARTICLE_MESSAGES } from "../Article.constants";

const ArticleNotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-4xl border border-gi-ash bg-linear-to-br from-gi-blue-lightest via-background to-background px-6 py-12 text-center shadow-sm sm:py-16">
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full bg-background text-gi-secondary shadow-sm ring-1 ring-gi-ash"
      >
        <SearchX className="size-8" />
      </span>
      <h1 className="font-extrabold text-3xl text-gi-primary sm:text-4xl">
        {ARTICLE_MESSAGES.notFound}
      </h1>
      <p className="text-gi-dark-gray text-lg">
        {ARTICLE_MESSAGES.notFoundHint}
      </p>
    </div>
  );
};

export default ArticleNotFound;
