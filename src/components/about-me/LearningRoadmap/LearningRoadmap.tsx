import { Badge } from "@gi-org-pl/athena";
import { twMerge } from "tailwind-merge";
import { ROADMAP_STATUS } from "./LearningRoadmap.constants";
import type { RoadmapStep } from "./LearningRoadmap.types";

interface Props {
  steps: RoadmapStep[];
}

const LearningRoadmap = ({ steps }: Props) => {
  return (
    <ol className="flex flex-col gap-6">
      {steps.map(({ title, description, status }) => {
        const { label, badgeType, dotClassName } = ROADMAP_STATUS[status];

        return (
          <li
            key={title}
            className="relative flex gap-4 before:absolute before:top-5 before:left-[5px] before:h-full before:w-0.5 before:bg-gi-dark-ash last:before:hidden"
          >
            <span
              aria-hidden="true"
              className={twMerge(
                "mt-1.5 size-3 shrink-0 rounded-full ring-4",
                dotClassName,
              )}
            />
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-gi-primary">{title}</h3>
                <Badge type={badgeType}>{label}</Badge>
              </div>
              <p className="leading-relaxed">{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default LearningRoadmap;
