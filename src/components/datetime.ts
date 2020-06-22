import { format, isSameDay, isSameYear } from "date-fns";
import RRule from "rrule";

import { Repeat } from "../graphql/generated";

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
 * Format repeat date using RRule
 */
const formatRRule = (rr: RRule) => rr.toText();

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
  repeat?: Repeat,
  includeTime: boolean = false,
  now: Date = new Date()
): string => {
  // same day
  if (end && isSameDay(start, end)) {
    const dateString = formatDate(start, now);
    const timeString = includeTime
      ? ` ${format(start, TIME_FORMAT)}~${format(end, TIME_FORMAT)}`
      : "";
    return `${dateString}${timeString}`;
  }

  const endString = end
    ? `~${formatSingleDatetime(end, includeTime, now)}`
    : "";
  const startString = formatSingleDatetime(start, includeTime, now);

  const repeatText = repeat ? `, ${formatRRule(repeatToRRule(repeat))}` : "";

  return startString + endString + repeatText;
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

const repeatToRRule = (r: Repeat): RRule => {
  let freq;
  switch (r.freq) {
    case "daily":
      freq = 3;
      break;
    case "weekly":
      freq = 2;
      break;
    case "monthly":
      freq = 1;
      break;
    case "yearly":
      freq = 0;
      break;
  }

  return new RRule({
    freq,
    byweekday: r.byweekday
  });
};
