import { Button, InfoMessage } from "@gi-org-pl/athena";
import { RotateCw } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ZIG_ZAG_ROW_CLASSES } from "../../../shared/ZigZagSection/ZigZagSection.constants";
import type { ArticlesState } from "../Blog.types";
import {
  ACCENT_ORDER,
  FEED_MESSAGES,
  PLACEHOLDER_SIDES,
} from "./ArticleFeed.constants";
import ArticleSection from "./ArticleSection/ArticleSection";

interface Props {
  state: ArticlesState;
  onRetry: () => void;
}

const ArticleFeed = ({ state, onRetry }: Props) => {
  if (state.status === "loading") {
    return (
      <div role="status" className="flex flex-col gap-10 lg:gap-14">
        <p className="text-center text-gi-dark-gray sm:text-left">
          {FEED_MESSAGES.loading}
        </p>
        {PLACEHOLDER_SIDES.map((side) => (
          <div
            key={side}
            aria-hidden="true"
            className={twMerge(
              "flex flex-col gap-6 motion-safe:animate-pulse lg:flex-row lg:items-center lg:gap-10",
              ZIG_ZAG_ROW_CLASSES[side],
            )}
          >
            <div className="flex w-full flex-col gap-4 rounded-4xl bg-gi-ash/70 p-6 lg:w-3/5">
              <span className="h-6 w-2/3 rounded-full bg-gi-dark-ash/60" />
              <span className="h-3 w-1/3 rounded-full bg-gi-dark-ash/60" />
              <span className="h-3 w-full rounded-full bg-gi-dark-ash/60" />
              <span className="h-3 w-5/6 rounded-full bg-gi-dark-ash/60" />
            </div>
            <div className="hidden aspect-4/3 w-full rounded-4xl bg-gi-ash/70 lg:block lg:w-2/5" />
          </div>
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 sm:items-start">
        <InfoMessage role="alert" variant="error">
          {FEED_MESSAGES.error}
        </InfoMessage>
        <Button
          type="outlined"
          LeftIcon={<RotateCw />}
          onClick={onRetry}
          className="focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 [&_svg_*]:fill-none [&_svg_*]:stroke-current"
        >
          {FEED_MESSAGES.retry}
        </Button>
      </div>
    );
  }

  if (state.articles.length === 0) {
    return (
      <InfoMessage role="status" variant="info">
        {FEED_MESSAGES.empty}
      </InfoMessage>
    );
  }

  return state.articles.map(({ id, title, content, publishedAt }, index) => (
    <ArticleSection
      key={id}
      title={title}
      content={content}
      publishedAt={publishedAt}
      side={index % 2 === 0 ? "right" : "left"}
      accent={ACCENT_ORDER[index % ACCENT_ORDER.length]}
    />
  ));
};

export default ArticleFeed;
