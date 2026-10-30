import StatusBadge from "../../../../shared/StatusBadge/StatusBadge";
import { PROJECT_STATUS } from "../ProjectCard.constants";
import type { ProjectStatus } from "../ProjectCard.types";

interface Props {
  status: ProjectStatus;
}

const ProjectStatusBadge = ({ status }: Props) => {
  const { label, badgeType } = PROJECT_STATUS[status];

  return <StatusBadge type={badgeType}>{label}</StatusBadge>;
};

export default ProjectStatusBadge;
