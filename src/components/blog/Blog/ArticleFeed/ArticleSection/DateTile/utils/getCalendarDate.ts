import { CALENDAR_DATE_FORMAT } from "../DateTile.constants";

export const getCalendarDate = (isoDate: string) => {
  const parts = Object.fromEntries(
    CALENDAR_DATE_FORMAT.formatToParts(new Date(isoDate)).map(
      ({ type, value }) => [type, value],
    ),
  );

  return { day: parts.day, month: parts.month, year: parts.year };
};
