import { Compass, House } from "lucide-react";
import { HOME_PATH } from "../../../constants/common";
import ButtonLink from "../ButtonLink/ButtonLink";
import StatusCard from "../StatusCard/StatusCard";
import { NOT_FOUND_MESSAGES } from "./NotFound.constants";

const NotFound = () => {
  return (
    <StatusCard
      Icon={<Compass />}
      title={NOT_FOUND_MESSAGES.title}
      hint={NOT_FOUND_MESSAGES.hint}
    >
      <ButtonLink to={HOME_PATH} LeftIcon={<House />}>
        {NOT_FOUND_MESSAGES.home}
      </ButtonLink>
    </StatusCard>
  );
};

export default NotFound;
