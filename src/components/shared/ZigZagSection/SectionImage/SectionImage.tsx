import { ImagePlus } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { TILE_CLASSES } from "./SectionImage.constants";
import type { SectionImageSource } from "./SectionImage.types";

interface Props {
  image?: SectionImageSource;
  Icon?: ReactNode;
}

const SectionImage = ({ image, Icon }: Props) => {
  if (image?.isAppIcon) {
    return (
      <div className={twMerge(TILE_CLASSES, "aspect-2/1 lg:aspect-4/3")}>
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="size-24 rounded-[22%] shadow-lg ring-1 ring-gi-ash lg:size-36"
        />
      </div>
    );
  }

  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="aspect-4/3 w-full rounded-4xl border border-gi-ash object-cover"
      />
    );
  }

  if (Icon) {
    return (
      <div
        aria-hidden="true"
        className={twMerge(
          TILE_CLASSES,
          "aspect-4/3 text-gi-secondary [&_svg]:size-24 [&_svg]:[stroke-width:1.25]",
        )}
      >
        {Icon}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex aspect-4/3 w-full items-center justify-center rounded-4xl border-2 border-gi-dark-ash border-dashed bg-gi-ash/60 text-gi-gray"
    >
      <ImagePlus className="size-10" />
    </div>
  );
};

export default SectionImage;
