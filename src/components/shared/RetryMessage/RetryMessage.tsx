import { Button } from "@gi-org-pl/athena";
import { RotateCw } from "lucide-react";
import { focusMainContent } from "../PageLayout/utils/focusMainContent";
import StatusMessage from "../StatusMessage/StatusMessage";

interface Props {
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

const RetryMessage = ({ message, retryLabel, onRetry }: Props) => {
  // The button disappears while loading again, so keep keyboard users on the page
  const retry = () => {
    focusMainContent();
    onRetry();
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:items-start">
      <StatusMessage role="alert" variant="error">
        {message}
      </StatusMessage>
      <Button
        type="outlined"
        LeftIcon={<RotateCw />}
        onClick={retry}
        className="focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 [&_svg_*]:fill-none [&_svg_*]:stroke-current"
      >
        {retryLabel}
      </Button>
    </div>
  );
};

export default RetryMessage;
