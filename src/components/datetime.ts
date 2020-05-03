import { format, isSameDay, isSameYear } from "date-fns";

/**
 * Set of helper function to deal with datetime
 */

const DATE_FORMAT = "d MMM";
const TIME_FORMAT = "HH:mm";

/**
 * Format date to `date month` and add year if not in the same year.
 */
const formatDate = (date: Date, now: Date = new Date()) =>
  format(date, `${DATE_FORMAT}${isSameYear(date, now) ? "" : " yyyy"}`);

/**
 * Format datetime of a single date
 */
const formatSingleDatetime = (
  date: Date,
  includeTime: boolean = false,
  now: Date = new Date()
): string => {
  return `${formatDate(date, now)}${
    includeTime ? ` ${format(date, TIME_FORMAT)}` : ""
  }`;
};

/**
 * Format date one of the following format

 *     - 18 Apr
 *     - 18 Apr 10:00
 *     - 18 Apr 2050
 *     - 18 Apr 2050 10:00
 * 
 *     - 18 Apr 13:00~14:00
 *     - 18 Apr 13:00~19 May 11:00 
 */
export const formatDatetime = (
  start: Date,
  end?: Date,
  includeTime: boolean = false,
  now: Date = new Date()
): string => {
  // same day
  if (end && isSameDay(start, end)) {
    const dateString = formatDate(start, now);
    const timeString = `${format(start, TIME_FORMAT)}~${format(
      end,
      TIME_FORMAT
    )}`;
    return `${dateString} ${timeString}`;
  }

  const endString = end
    ? `~${formatSingleDatetime(end, includeTime, now)}`
    : "";
  const startString = formatSingleDatetime(start, includeTime, now);

  return startString + endString;
};
