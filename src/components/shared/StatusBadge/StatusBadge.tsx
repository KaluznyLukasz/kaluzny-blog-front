import { Badge } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import { STATUS_BADGE_CLASSES } from "./StatusBadge.constants";
import type { StatusBadgeType } from "./StatusBadge.types";

interface Props {
  type: StatusBadgeType;
  children: ReactNode;
}

const StatusBadge = ({ type, children }: Props) => {
  return (
    <Badge type={type} className={STATUS_BADGE_CLASSES[type]}>
      {children}
    </Badge>
  );
};

export default StatusBadge;
