import { Button } from "@gi-org-pl/athena";
import { House, RotateCw, TriangleAlert } from "lucide-react";
import { HOME_PATH, SITE_NAME } from "../../../constants/common";
import { useDocumentTitle } from "../../../utils/useDocumentTitle";
import ButtonLink from "../ButtonLink/ButtonLink";
import StatusCard from "../StatusCard/StatusCard";
import { ERROR_PAGE_MESSAGES } from "./ErrorPage.constants";

const ErrorPage = () => {
  useDocumentTitle(`${ERROR_PAGE_MESSAGES.title} · ${SITE_NAME}`);

  return (
    <StatusCard
      Icon={<TriangleAlert />}
      title={ERROR_PAGE_MESSAGES.title}
      hint={ERROR_PAGE_MESSAGES.hint}
    >
      <Button
        LeftIcon={<RotateCw />}
        onClick={() => window.location.reload()}
        className="border border-transparent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 [&_svg_*]:fill-none [&_svg_*]:stroke-current"
      >
        {ERROR_PAGE_MESSAGES.reload}
      </Button>
      <ButtonLink to={HOME_PATH} variant="outlined" LeftIcon={<House />}>
        {ERROR_PAGE_MESSAGES.home}
      </ButtonLink>
    </StatusCard>
  );
};

export default ErrorPage;
