import { SearchX } from "lucide-react";
import StatusCard from "../../../shared/StatusCard/StatusCard";
import { ARTICLE_MESSAGES } from "../Article.constants";

const ArticleNotFound = () => {
  return (
    <StatusCard
      Icon={<SearchX />}
      title={ARTICLE_MESSAGES.notFound}
      hint={ARTICLE_MESSAGES.notFoundHint}
    />
  );
};

export default ArticleNotFound;
