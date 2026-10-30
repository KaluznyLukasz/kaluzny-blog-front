import { Badge } from "@gi-org-pl/athena";
import { PROJECT_TAGS_LABEL } from "../ProjectCard.constants";

interface Props {
  tags: string[];
}

const ProjectTags = ({ tags }: Props) => {
  return (
    <ul aria-label={PROJECT_TAGS_LABEL} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge>{tag}</Badge>
        </li>
      ))}
    </ul>
  );
};

export default ProjectTags;
