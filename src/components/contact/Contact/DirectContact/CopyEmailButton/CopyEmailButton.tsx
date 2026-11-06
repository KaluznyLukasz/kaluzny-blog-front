import { CONTACT_EMAIL } from "../../../../../constants/contacts";
import { useCopyToClipboard } from "../../../../../utils/useCopyToClipboard";
import { COPY_EMAIL_STATUS } from "./CopyEmailButton.constants";

const CopyEmailButton = () => {
  const { status, copy } = useCopyToClipboard();
  const { label, Icon } = COPY_EMAIL_STATUS[status];

  // Announced outside the button, and only the result, so screen readers do
  // not repeat "Copy email" when the label switches back
  return (
    <>
      <button
        type="button"
        onClick={() => copy(CONTACT_EMAIL)}
        className="group inline-flex cursor-pointer items-center rounded-full bg-white px-4 py-2 font-medium text-gi-primary text-sm shadow-sm transition duration-300 hover:bg-gi-ash hover:shadow-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        {/* The key restarts the animation every time the status changes */}
        <span
          key={status}
          className="inline-flex animate-in items-center gap-2 animation-duration-300 fade-in zoom-in-90 ease-out motion-reduce:animate-none"
        >
          <Icon
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
          {label}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "idle" ? "" : label}
      </span>
    </>
  );
};

export default CopyEmailButton;
