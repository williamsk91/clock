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

/**
 * Converts string to date.
 * Used to deserialise `DateTime` scalar from the server.
 */
export const parseDate = (s: string | null): Date | null => {
  let date: Date | null = null;
  try {
    date = s ? new Date(s) : null;
  } catch (error) {}
  return date;
};

/**
 * Similar to `parseDate` but ignores undefined.
 * Warning: this will throw an error if input is not a date string.
 */
export const parseDefinedDate = (s: string): Date => new Date(s);
