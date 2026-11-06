import { useCopyToClipboard } from "../../../../utils/useCopyToClipboard";
import { COPY_STATUS } from "./CopyLinkButton.constants";

const CopyLinkButton = () => {
  const { status, copy } = useCopyToClipboard();
  const { label, Icon } = COPY_STATUS[status];

  // Announced outside the button, and only the result, so screen readers do
  // not repeat "Copy link" when the label switches back
  return (
    <>
      <button
        type="button"
        onClick={() => copy(window.location.href)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-gi-ash px-2.75 py-0.75 font-medium text-gi-dark-gray transition-colors hover:bg-gi-dark-ash focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
      >
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        {label}
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "idle" ? "" : label}
      </span>
    </>
  );
};

export default CopyLinkButton;
