import { format, isSameDay, isSameYear } from "date-fns";
import RRule, { ByWeekday, Frequency } from "rrule";

import { Repeat, RepeatFrequency } from "../graphql/generated";

/**
 * Set of helper function to deal with datetime
 */

const DATE_FORMAT = "d MMM";
const TIME_FORMAT = "HH:mm";

/**
 * Update only time component of `date`
 */
export const setTime = (date: Date, time: Date): Date =>
  new Date(
    date.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
  );

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
const formatRRule = (rr: RRule): string => {
  switch (rr.options.freq) {
    case Frequency.DAILY:
      return "daily";
    case Frequency.WEEKLY:
      return "weekly";
    case Frequency.MONTHLY:
      return "monthly";
    case Frequency.YEARLY:
      return "yearly";
    default:
      return "";
  }
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

export const repeatToRRule = (r: Repeat): RRule => {
  let freq;
  switch (r.freq) {
    case RepeatFrequency.Daily:
      freq = 3;
      break;
    case RepeatFrequency.Weekly:
      freq = 2;
      break;
    case RepeatFrequency.Monthly:
      freq = 1;
      break;
    case RepeatFrequency.Yearly:
      freq = 0;
      break;
  }

  return new RRule({
    dtstart: new Date(r.start),
    freq,
    byweekday: r.byweekday as ByWeekday[],
  });
};
