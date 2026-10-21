import { twMerge } from "tailwind-merge";
import { PUBLISHED_DATE_FORMAT } from "../../../../constants/common";
import type { Article } from "../../../../services/api/schemas/article";
import { ENTER_ANIMATION_CLASSES } from "./ArticleContent.constants";
import { splitParagraphs } from "./utils/splitParagraphs";

type Props = Pick<Article, "title" | "content" | "publishedAt">;

const ArticleContent = ({ title, content, publishedAt }: Props) => {
  return (
    <article
      className={twMerge(
        "flex min-w-0 flex-col gap-6 rounded-4xl border border-gi-ash bg-background/80 p-6 shadow-sm sm:p-10",
        ENTER_ANIMATION_CLASSES,
      )}
    >
      <header className="flex flex-col gap-3">
        <time dateTime={publishedAt} className="text-gi-dark-gray text-sm">
          {PUBLISHED_DATE_FORMAT.format(new Date(publishedAt))}
        </time>
        <h1 className="bg-linear-to-r from-gi-primary via-gi-secondary to-gi-blue bg-clip-text font-extrabold text-3xl text-transparent sm:text-4xl">
          {title}
        </h1>
      </header>
      <div className="flex flex-col gap-4 text-lg leading-relaxed">
        {splitParagraphs(content).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default ArticleContent;
