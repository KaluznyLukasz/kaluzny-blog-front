import { twMerge } from "tailwind-merge";
import { ACCENT_STYLES } from "./DateTile.constants";
import type { DateTileAccent } from "./DateTile.types";
import { getCalendarDate } from "./utils/getCalendarDate";

interface Props {
  publishedAt: string;
  accent: DateTileAccent;
}

const DateTile = ({ publishedAt, accent }: Props) => {
  const { day, month, year } = getCalendarDate(publishedAt);
  const { tileClassName, stripClassName } = ACCENT_STYLES[accent];

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        "flex aspect-4/3 w-full items-center justify-center rounded-4xl border border-gi-ash bg-linear-to-br via-background to-background",
        tileClassName,
      )}
    >
      <div className="flex w-36 -rotate-3 flex-col overflow-hidden rounded-2xl bg-background text-center shadow-lg ring-1 ring-gi-ash">
        <div
          className={twMerge(
            "flex flex-col items-center gap-1 pt-2 pb-1.5",
            stripClassName,
          )}
        >
          <span className="flex gap-12">
            <span className="size-2 rounded-full bg-background/80" />
            <span className="size-2 rounded-full bg-background/80" />
          </span>
          <span className="font-bold text-sm uppercase tracking-widest">
            {month}
          </span>
        </div>
        <span className="pt-3 font-extrabold text-6xl text-gi-primary leading-none">
          {day}
        </span>
        <span className="pt-1 pb-4 font-medium text-gi-dark-gray text-sm">
          {year}
        </span>
      </div>
    </div>
  );
};

export default DateTile;
