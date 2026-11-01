import Portfolio from "../components/portfolio/Portfolio/Portfolio";
import { PORTFOLIO_DESCRIPTION } from "../components/portfolio/Portfolio/Portfolio.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/portfolio";

export const meta = (() =>
  createMeta(
    `Portfolio · ${SITE_NAME}`,
    PORTFOLIO_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
