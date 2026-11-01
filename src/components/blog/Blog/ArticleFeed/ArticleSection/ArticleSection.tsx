import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { PUBLISHED_DATE_FORMAT } from "../../../../../constants/common";
import type { Article } from "../../../../../services/api/schemas/article";
import { getArticlePath } from "../../../../../utils/getArticlePath";
import ZigZagSection from "../../../../shared/ZigZagSection/ZigZagSection";
import type { ZigZagSide } from "../../../../shared/ZigZagSection/ZigZagSection.types";
import { READ_MORE_LABEL } from "./ArticleSection.constants";
import DateTile from "./DateTile/DateTile";
import type { DateTileAccent } from "./DateTile/DateTile.types";

type Props = Pick<
  Article,
  "id" | "title" | "content" | "publishedAt" | "imageUrl"
> & {
  side: ZigZagSide;
  accent: DateTileAccent;
};

const ArticleSection = ({
  id,
  title,
  content,
  publishedAt,
  imageUrl,
  side,
  accent,
}: Props) => {
  const image = imageUrl ? { src: imageUrl, alt: "" } : undefined;

  return (
    <ZigZagSection
      title={title}
      side={side}
      image={image}
      aside={
        image ? undefined : (
          <DateTile publishedAt={publishedAt} accent={accent} />
        )
      }
    >
      <div className="flex flex-col gap-3">
        <time dateTime={publishedAt} className="text-gi-dark-gray text-sm">
          {PUBLISHED_DATE_FORMAT.format(new Date(publishedAt))}
        </time>
        <p className="line-clamp-4 leading-relaxed">{content}</p>
        <Link
          to={getArticlePath(id)}
          aria-label={`${READ_MORE_LABEL} about ${title}`}
          className="inline-flex max-w-full items-center gap-2 self-start rounded-sm font-medium text-gi-secondary underline underline-offset-4 transition-colors hover:text-gi-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-secondary"
        >
          {READ_MORE_LABEL}
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </ZigZagSection>
  );
};

export default ArticleSection;
