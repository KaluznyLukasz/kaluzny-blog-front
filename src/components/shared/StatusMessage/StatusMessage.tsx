import { InfoMessage } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import { STATUS_MESSAGE_CLASSES } from "./StatusMessage.constants";
import type { StatusMessageVariant } from "./StatusMessage.types";

interface Props {
  variant: StatusMessageVariant;
  role: "status" | "alert";
  children: ReactNode;
}

const StatusMessage = ({ variant, role, children }: Props) => {
  return (
    <InfoMessage
      role={role}
      variant={variant}
      className={STATUS_MESSAGE_CLASSES[variant]}
    >
      {children}
    </InfoMessage>
  );
};

export default StatusMessage;
