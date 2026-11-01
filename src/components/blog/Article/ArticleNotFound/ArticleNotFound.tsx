import { SearchX } from "lucide-react";
import { SITE_NAME } from "../../../../constants/common";
import { useDocumentTitle } from "../../../../utils/useDocumentTitle";
import StatusCard from "../../../shared/StatusCard/StatusCard";
import { ARTICLE_MESSAGES } from "../Article.constants";

const ArticleNotFound = () => {
  useDocumentTitle(`${ARTICLE_MESSAGES.notFound} · ${SITE_NAME}`);

  return (
    <StatusCard
      Icon={<SearchX />}
      title={ARTICLE_MESSAGES.notFound}
      hint={ARTICLE_MESSAGES.notFoundHint}
    />
  );
};

export default ArticleNotFound;
