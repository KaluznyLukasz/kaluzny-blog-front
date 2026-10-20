import neighborlyIcon from "../../../assets/images/neighborly-icon.png";
import zstioIcon from "../../../assets/images/zstio-icon.png";
import type { Project } from "./ProjectCard/ProjectCard.types";

export const PORTFOLIO_DESCRIPTION = "A few things I have built.";

export const PROJECTS: Project[] = [
  {
    name: "ZSTiO",
    description:
      "The official app of my school, built together with a friend and available on the App Store and Google Play. Timetables, school news and the e-register with grades and attendance, plus home-screen widgets, an Apple Watch app and iPad support.",
    links: [
      {
        kind: "app-store",
        href: "https://apps.apple.com/pl/app/zstio/id6742645790",
      },
      {
        kind: "google-play",
        href: "https://play.google.com/store/apps/details?id=net.ZSTiO",
      },
    ],
    image: { src: zstioIcon, alt: "ZSTiO app icon", isAppIcon: true },
  },
  {
    name: "Neighborly",
    description:
      "Ask your neighbours for a hand, or lend one. A native iOS app built with SwiftUI and Firebase, with a map of nearby requests and home-screen widgets. It's still a work in progress.",
    image: { src: neighborlyIcon, alt: "Neighborly app icon", isAppIcon: true },
  },
];
