import type { ReactNode } from "react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  BUTTON_LINK_CLASSES,
  BUTTON_LINK_VARIANT_CLASSES,
} from "./ButtonLink.constants";
import type { ButtonLinkVariant } from "./ButtonLink.types";

interface Props {
  to: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  className?: string;
}

const ICON_CLASSES = "shrink-0 [&_svg]:size-4";

const ButtonLink = ({
  to,
  children,
  variant = "primary",
  LeftIcon,
  RightIcon,
  className,
}: Props) => {
  return (
    <Link
      to={to}
      className={twMerge(
        BUTTON_LINK_CLASSES,
        BUTTON_LINK_VARIANT_CLASSES[variant],
        className,
      )}
    >
      {LeftIcon && (
        <span aria-hidden="true" className={ICON_CLASSES}>
          {LeftIcon}
        </span>
      )}
      {children}
      {RightIcon && (
        <span
          aria-hidden="true"
          className={twMerge(
            ICON_CLASSES,
            "transition-transform group-hover:translate-x-1 motion-reduce:transition-none",
          )}
        >
          {RightIcon}
        </span>
      )}
    </Link>
  );
};

export default ButtonLink;
