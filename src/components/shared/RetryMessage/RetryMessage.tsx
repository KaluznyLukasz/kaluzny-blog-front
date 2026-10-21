import { Button, InfoMessage } from "@gi-org-pl/athena";
import { RotateCw } from "lucide-react";

interface Props {
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

const RetryMessage = ({ message, retryLabel, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:items-start">
      <InfoMessage role="alert" variant="error">
        {message}
      </InfoMessage>
      <Button
        type="outlined"
        LeftIcon={<RotateCw />}
        onClick={onRetry}
        className="focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 [&_svg_*]:fill-none [&_svg_*]:stroke-current"
      >
        {retryLabel}
      </Button>
    </div>
  );
};

export default RetryMessage;
