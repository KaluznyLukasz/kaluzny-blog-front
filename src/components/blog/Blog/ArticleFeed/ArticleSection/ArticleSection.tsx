import type { Article } from "../../../../../services/api/schemas/article";
import ZigZagSection from "../../../../shared/ZigZagSection/ZigZagSection";
import type { ZigZagSide } from "../../../../shared/ZigZagSection/ZigZagSection.types";
import { PUBLISHED_DATE_FORMAT } from "./ArticleSection.constants";
import DateTile from "./DateTile/DateTile";
import type { DateTileAccent } from "./DateTile/DateTile.types";

type Props = Pick<Article, "title" | "content" | "publishedAt"> & {
  side: ZigZagSide;
  accent: DateTileAccent;
};

const ArticleSection = ({
  title,
  content,
  publishedAt,
  side,
  accent,
}: Props) => {
  return (
    <ZigZagSection
      title={title}
      side={side}
      aside={<DateTile publishedAt={publishedAt} accent={accent} />}
    >
      <div className="flex flex-col gap-3">
        <time dateTime={publishedAt} className="text-gi-dark-gray text-sm">
          {PUBLISHED_DATE_FORMAT.format(new Date(publishedAt))}
        </time>
        <p className="line-clamp-4 leading-relaxed">{content}</p>
      </div>
    </ZigZagSection>
  );
};

export default ArticleSection;
