import { Badge } from "@gi-org-pl/athena";
import Reveal from "../../shared/Reveal/Reveal";
import { SKILL_REVEAL_STEP } from "./SkillList.constants";

interface Props {
  skills: string[];
}

const SkillList = ({ skills }: Props) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <li key={skill}>
          <Reveal delay={index * SKILL_REVEAL_STEP}>
            <Badge size="big">{skill}</Badge>
          </Reveal>
        </li>
      ))}
    </ul>
  );
};

export default SkillList;
