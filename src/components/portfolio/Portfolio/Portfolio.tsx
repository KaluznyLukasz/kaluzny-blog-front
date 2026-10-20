import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import ZigZagSection from "../../shared/ZigZagSection/ZigZagSection";
import { PORTFOLIO_DESCRIPTION, PROJECTS } from "./Portfolio.constants";
import ProjectCard from "./ProjectCard/ProjectCard";

const Portfolio = () => {
  return (
    <>
      <Reveal>
        <PageHeader title="Portfolio" description={PORTFOLIO_DESCRIPTION} />
      </Reveal>
      {PROJECTS.map((project, index) => (
        <ZigZagSection
          key={project.name}
          title={project.name}
          side={index % 2 === 0 ? "right" : "left"}
          image={project.image}
        >
          <ProjectCard {...project} />
        </ZigZagSection>
      ))}
    </>
  );
};

export default Portfolio;
