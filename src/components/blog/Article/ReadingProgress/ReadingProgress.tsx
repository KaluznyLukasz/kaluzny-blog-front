import { useEffect, useState } from "react";

const getProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollable <= 0) return 0;

  return Math.min(1, Math.max(0, window.scrollY / scrollable));
};

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => setProgress(getProgress());

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-20 h-1 w-full origin-left bg-linear-to-r from-gi-secondary to-gi-blue"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
};

export default ReadingProgress;
