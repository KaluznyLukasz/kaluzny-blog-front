import { CodeXml, Route } from "lucide-react";
import Reveal from "../../shared/Reveal/Reveal";
import ZigZagSection from "../../shared/ZigZagSection/ZigZagSection";
import LearningRoadmap from "../LearningRoadmap/LearningRoadmap";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SkillList from "../SkillList/SkillList";
import {
  ABOUT_ME_IMAGE,
  INTRODUCTION,
  PROFILE,
  ROADMAP,
  SKILLS,
} from "./AboutMe.constants";

const AboutMe = () => {
  return (
    <>
      <Reveal>
        <ProfileHeader
          name={PROFILE.name}
          role={PROFILE.role}
          photo={PROFILE.photo}
        />
      </Reveal>
      <ZigZagSection title="About me" side="right" image={ABOUT_ME_IMAGE}>
        <div className="flex flex-col gap-4 leading-relaxed">
          {INTRODUCTION.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ZigZagSection>
      <ZigZagSection title="Tech stack" side="left" Icon={<CodeXml />}>
        <SkillList skills={SKILLS} />
      </ZigZagSection>
      <ZigZagSection title="My journey" side="right" Icon={<Route />}>
        <LearningRoadmap steps={ROADMAP} />
      </ZigZagSection>
    </>
  );
};

export default AboutMe;
