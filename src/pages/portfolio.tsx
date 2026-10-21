import Portfolio from "../components/portfolio/Portfolio/Portfolio";
import { SITE_NAME } from "../constants/common";
import type { Route } from "./+types/portfolio";

export const meta = (() => [
  { title: `Portfolio · ${SITE_NAME}` },
]) satisfies Route.MetaFunction;

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
