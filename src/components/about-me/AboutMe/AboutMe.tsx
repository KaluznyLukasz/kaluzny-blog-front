import { ArrowRight, CodeXml, Mail, Route } from "lucide-react";
import { CONTACT_PATH, PORTFOLIO_PATH } from "../../../constants/common";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import ContactCta from "../../shared/ContactCta/ContactCta";
import Reveal from "../../shared/Reveal/Reveal";
import ZigZagSection from "../../shared/ZigZagSection/ZigZagSection";
import LearningRoadmap from "../LearningRoadmap/LearningRoadmap";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import SkillList from "../SkillList/SkillList";
import {
  ABOUT_ME_IMAGE,
  HERO_ACTIONS,
  INTRODUCTION,
  PROFILE,
  PROFILE_FACTS,
  ROADMAP,
  SKILL_GROUPS,
} from "./AboutMe.constants";

const AboutMe = () => {
  return (
    <>
      <Reveal>
        <ProfileHeader
          name={PROFILE.name}
          role={PROFILE.role}
          photo={PROFILE.photo}
          tagline={PROFILE.tagline}
          facts={PROFILE_FACTS}
        >
          <ButtonLink to={PORTFOLIO_PATH} RightIcon={<ArrowRight />}>
            {HERO_ACTIONS.work}
          </ButtonLink>
          <ButtonLink to={CONTACT_PATH} variant="outlined" LeftIcon={<Mail />}>
            {HERO_ACTIONS.contact}
          </ButtonLink>
        </ProfileHeader>
      </Reveal>
      <ZigZagSection title="About me" side="right" image={ABOUT_ME_IMAGE}>
        <div className="flex flex-col gap-4 leading-relaxed">
          {INTRODUCTION.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ZigZagSection>
      <ZigZagSection title="Tech stack" side="left" Icon={<CodeXml />}>
        <SkillList groups={SKILL_GROUPS} />
      </ZigZagSection>
      <ZigZagSection title="My journey" side="right" Icon={<Route />}>
        <LearningRoadmap steps={ROADMAP} />
      </ZigZagSection>
      <ContactCta />
    </>
  );
};

export default AboutMe;
