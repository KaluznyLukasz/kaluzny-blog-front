import { PROJECT_LINKS } from "./ProjectCard.constants";
import type { Project } from "./ProjectCard.types";
import ProjectStatusBadge from "./ProjectStatusBadge/ProjectStatusBadge";
import ProjectTags from "./ProjectTags/ProjectTags";
import TextLink from "./TextLink/TextLink";

type Props = Pick<
  Project,
  "name" | "description" | "status" | "tags" | "links"
>;

const ProjectCard = ({
  name,
  description,
  status,
  tags = [],
  links = [],
}: Props) => {
  return (
    <div className="flex flex-col items-start gap-3">
      {status && <ProjectStatusBadge status={status} />}
      <p className="leading-relaxed">{description}</p>
      {tags.length > 0 && <ProjectTags tags={tags} />}
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
