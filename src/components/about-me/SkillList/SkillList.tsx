import { Badge } from "@gi-org-pl/athena";
import Reveal from "../../shared/Reveal/Reveal";
import { SKILL_REVEAL_STEP } from "./SkillList.constants";
import type { SkillGroup } from "./SkillList.types";

interface Props {
  groups: SkillGroup[];
}

const SkillList = ({ groups }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {groups.map(({ title, skills }) => (
        <div key={title} className="flex flex-col gap-2">
          <h3 className="font-bold text-gi-primary text-sm uppercase tracking-wide">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <li key={skill}>
                <Reveal delay={index * SKILL_REVEAL_STEP}>
                  <Badge size="big">{skill}</Badge>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkillList;
