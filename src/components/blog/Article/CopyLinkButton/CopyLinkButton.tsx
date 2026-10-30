import { useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_MS, COPY_STATUS } from "./CopyLinkButton.constants";
import type { CopyStatus } from "./CopyLinkButton.types";

const CopyLinkButton = () => {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { label, Icon } = COPY_STATUS[status];

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gi-ash px-3 py-1 font-medium text-gi-dark-gray transition-colors hover:bg-gi-dark-ash focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span aria-live="polite">{label}</span>
    </button>
  );
};

export default CopyLinkButton;
