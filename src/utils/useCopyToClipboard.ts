import { useEffect, useRef, useState } from "react";

export type CopyStatus = "idle" | "copied" | "failed";

export const COPY_FEEDBACK_MS = 2000;

export const useCopyToClipboard = () => {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), COPY_FEEDBACK_MS);
  };

  return { status, copy };
};
