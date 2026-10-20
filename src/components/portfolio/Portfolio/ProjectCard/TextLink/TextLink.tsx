import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  LeftIcon?: ReactNode;
}

const TextLink = ({ href, children, LeftIcon }: Props) => {
  return (
    <a
      href={href}
      className="inline-flex max-w-full items-center gap-2 rounded-sm font-medium text-gi-secondary underline underline-offset-4 transition-colors hover:text-gi-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gi-secondary"
    >
      {LeftIcon && (
        <span aria-hidden="true" className="shrink-0 [&_svg]:size-4">
          {LeftIcon}
        </span>
      )}
      <span className="min-w-0 wrap-anywhere">{children}</span>
    </a>
  );
};

export default TextLink;
