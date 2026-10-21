import { CalendarDays, Clock } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { PUBLISHED_DATE_FORMAT } from "../../../../constants/common";
import type { Article } from "../../../../services/api/schemas/article";
import {
  ENTER_ANIMATION_CLASSES,
  LEAD_PARAGRAPH_CLASSES,
} from "./ArticleContent.constants";
import { getReadingMinutes } from "./utils/getReadingMinutes";
import { splitParagraphs } from "./utils/splitParagraphs";

type Props = Pick<Article, "title" | "content" | "publishedAt">;

const CHIP_CLASSES =
  "inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium";

const ArticleContent = ({ title, content, publishedAt }: Props) => {
  const paragraphs = splitParagraphs(content);
  const readingMinutes = getReadingMinutes(content);

  return (
    <article
      className={twMerge(
        "flex min-w-0 flex-col overflow-hidden rounded-4xl border border-gi-ash bg-background/90 shadow-md",
        ENTER_ANIMATION_CLASSES,
      )}
    >
      <header className="flex flex-col gap-5 border-gi-ash border-b bg-linear-to-br from-gi-blue-lightest via-background to-background px-6 py-8 sm:px-12 sm:py-12">
        <ul className="flex flex-wrap items-center gap-2 text-sm">
          <li>
            <time
              dateTime={publishedAt}
              className={twMerge(CHIP_CLASSES, "bg-gi-primary text-white")}
            >
              <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
              {PUBLISHED_DATE_FORMAT.format(new Date(publishedAt))}
            </time>
          </li>
          {readingMinutes > 0 && (
            <li>
              <span
                className={twMerge(CHIP_CLASSES, "bg-gi-ash text-gi-dark-gray")}
              >
                <Clock aria-hidden="true" className="size-4 shrink-0" />
                {readingMinutes} min read
              </span>
            </li>
          )}
        </ul>
        <h1 className="bg-linear-to-r from-gi-primary via-gi-secondary to-gi-blue bg-clip-text pb-1 font-extrabold text-3xl text-transparent leading-tight sm:text-5xl">
          {title}
        </h1>
      </header>
      <div className="flex flex-col gap-6 px-6 py-8 text-lg leading-8 sm:px-12 sm:py-12">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={
              paragraphs.length > 1 && index === 0
                ? LEAD_PARAGRAPH_CLASSES
                : undefined
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

export default ArticleContent;
