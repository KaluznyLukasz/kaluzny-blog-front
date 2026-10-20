import { PROJECT_LINKS } from "./ProjectCard.constants";
import type { Project } from "./ProjectCard.types";
import TextLink from "./TextLink/TextLink";

const ProjectCard = ({ name, description, links = [] }: Project) => {
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="leading-relaxed">{description}</p>
      {links.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ kind, href }) => {
            const { label, Icon } = PROJECT_LINKS[kind];

            return (
              <li key={kind}>
                <TextLink href={href} LeftIcon={<Icon />}>
                  {label} <span className="sr-only">for {name}</span>
                </TextLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProjectCard;
