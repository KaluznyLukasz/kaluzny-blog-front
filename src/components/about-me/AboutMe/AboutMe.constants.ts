import { MapPin, Rocket } from "lucide-react";
import meteoraPhoto from "../../../assets/images/meteora.jpg";
import skiathosPhoto from "../../../assets/images/skiatos.jpeg";
import type { SectionImageSource } from "../../shared/ZigZagSection/SectionImage/SectionImage.types";
import type { RoadmapStep } from "../LearningRoadmap/LearningRoadmap.types";
import type { ProfileFact } from "../ProfileHeader/ProfileHeader.types";
import type { SkillGroup } from "../SkillList/SkillList.types";

export const PROFILE = {
  name: "Łukasz Kałużny",
  role: "Mobile developer · iOS & Android",
  tagline:
    "I build mobile apps that turn everyday problems into something simple and enjoyable to use.",
  photo: skiathosPhoto,
};

export const PROFILE_FACTS: ProfileFact[] = [
  { Icon: MapPin, label: "Based in Poland" },
  { Icon: Rocket, label: "Learning Android with Kotlin" },
];

export const HERO_ACTIONS = {
  work: "View my work",
  contact: "Get in touch",
};

export const ABOUT_ME_IMAGE: SectionImageSource = {
  src: meteoraPhoto,
  alt: "Me standing on a rock at Meteora in Greece, with mountains and a valley behind me",
};

export const INTRODUCTION = [
  "I'm studying programming at a technical school in Poland. Together with a friend, I designed, built and shipped ZSTiO, the official app of our school, made for students, parents and teachers and available on the App Store and Google Play.",
  "I've completed an internship at the Generacja Innowacja Foundation, where I learnt how a professional team plans, reviews and ships software. Right now I'm learning Android development and taking my iOS skills further.",
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Mobile",
    skills: ["Swift", "SwiftUI", "Kotlin", "Java", "Firebase"],
  },
  {
    title: "Web",
    skills: ["TypeScript", "React", "React Router", "Tailwind CSS", "SQL"],
  },
  {
    title: "Testing & tooling",
    skills: ["Vitest", "Playwright", "Storybook", "Git"],
  },
];

export const SKILLS = SKILL_GROUPS.flatMap(({ skills }) => skills);

export const ROADMAP: RoadmapStep[] = [
  {
    title: "Web foundations",
    description:
      "Three years of HTML, CSS, JavaScript, PHP and SQL at my technical school.",
    status: "done",
  },
  {
    title: "iOS development",
    description:
      "Switched to mobile and started building native iPhone apps with Swift and SwiftUI.",
    status: "done",
  },
  {
    title: "My first app release",
    description:
      "Shipped ZSTiO with a friend: the official app of my school, on the App Store and Google Play.",
    status: "done",
  },
  {
    title: "Generacja Innowacja Foundation",
    description:
      "An internship where I built web apps with React, TypeScript and Tailwind CSS, tested them with Vitest, documented components in Storybook, and shipped every change through code review and CI.",
    status: "done",
  },
  {
    title: "Android development",
    description: "Learning to build native Android apps with Kotlin.",
    status: "in-progress",
  },
  {
    title: "Levelling up on iOS",
    description: "Going deeper into Swift and SwiftUI with every new app.",
    status: "in-progress",
  },
];
