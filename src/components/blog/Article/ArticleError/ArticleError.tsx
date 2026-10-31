import { SITE_NAME } from "../../../../constants/common";
import { useDocumentTitle } from "../../../../utils/useDocumentTitle";
import RetryMessage from "../../../shared/RetryMessage/RetryMessage";
import { ARTICLE_MESSAGES } from "../Article.constants";

interface Props {
  onRetry: () => void;
}

const ArticleError = ({ onRetry }: Props) => {
  useDocumentTitle(`${ARTICLE_MESSAGES.errorTitle} · ${SITE_NAME}`);

  return (
    <>
      <h1 className="sr-only">{ARTICLE_MESSAGES.errorTitle}</h1>
      <RetryMessage
        message={ARTICLE_MESSAGES.error}
        retryLabel={ARTICLE_MESSAGES.retry}
        onRetry={onRetry}
      />
    </>
  );
};

export default ArticleError;
