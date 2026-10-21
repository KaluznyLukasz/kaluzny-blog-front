import { Section } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Reveal from "../Reveal/Reveal";
import SectionImage from "./SectionImage/SectionImage";
import type { SectionImageSource } from "./SectionImage/SectionImage.types";
import {
  IMAGE_REVEAL_DELAY,
  OPPOSITE_SIDE,
  ZIG_ZAG_IMAGE_CLASSES,
  ZIG_ZAG_ROW_CLASSES,
  ZIG_ZAG_SECTION_CLASSES,
} from "./ZigZagSection.constants";
import type { ZigZagSide } from "./ZigZagSection.types";

interface Props {
  title: string;
  side: ZigZagSide;
  image?: SectionImageSource;
  Icon?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}

const TILT_CLASSES =
  "transition-[rotate] duration-300 hover:rotate-0 motion-reduce:transition-none";

const ZigZagSection = ({
  title,
  side,
  image,
  Icon,
  aside,
  children,
}: Props) => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10",
        ZIG_ZAG_ROW_CLASSES[side],
      )}
    >
      <Reveal
        from={side}
        className={twMerge(
          "w-full lg:w-3/5",
          TILT_CLASSES,
          ZIG_ZAG_SECTION_CLASSES[side],
        )}
      >
        <Section title={title}>{children}</Section>
      </Reveal>
      <Reveal
        from={OPPOSITE_SIDE[side]}
        delay={IMAGE_REVEAL_DELAY}
        className={twMerge(
          "w-full lg:w-2/5",
          TILT_CLASSES,
          ZIG_ZAG_IMAGE_CLASSES[side],
          !image && "hidden lg:block",
        )}
      >
        {aside ?? <SectionImage image={image} Icon={Icon} />}
      </Reveal>
    </div>
  );
};

export default ZigZagSection;
