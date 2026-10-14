import { type ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { REVEAL_DIRECTION_CLASSES, REVEAL_THRESHOLD } from "./Reveal.constants";
import type { RevealDirection } from "./Reveal.types";

interface Props {
  children: ReactNode;
  from?: RevealDirection;
  delay?: number;
  className?: string;
}

const canObserve = () => typeof IntersectionObserver !== "undefined";

const Reveal = ({ children, from = "bottom", delay = 0, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(() => !canObserve());

  useEffect(() => {
    if (isRevealed || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsRevealed(true);
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isRevealed]);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={twMerge(
        isRevealed
          ? `animate-in fade-in fill-mode-both animation-duration-700 ease-out ${REVEAL_DIRECTION_CLASSES[from]}`
          : "opacity-0",
        "motion-reduce:animate-none motion-reduce:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
