export const eventColors = {
  red: "#FF4D4F",
  pink: "#F562AC",
  magenta: "#E27CF1",
  purple: "#7F7CE6",
  lightBlue: "#66C6F2",
  cyan: "#25D9B9",
  green: "#50D989",
  lime: "#9EE67A",
  orange: "#FAA255",
  yellow: "#F0C348",
  black: "#434343",
  // Calendar default color
  blue: "#3788D8",
};

export type EventColor = keyof typeof eventColors;

/**
 * Lighter set of event colors
 */
export const eventColors50: Record<EventColor, string> = {
  red: "#FEB1B1",
  pink: "#FAB4D7",
  magenta: "#ECB4F5",
  purple: "#C4C2FF",
  lightBlue: "#9EE1FF",
  cyan: "#8CEBDB",
  green: "#78EBA8",
  lime: "#C0F5A2",
  orange: "#FFCEA3",
  yellow: "#FBE692",
  black: "#8D8D8D",
  blue: "#75B6F8",
};

/**
 * default background color of FullCalendar events
 */
export const defaultEventColor: EventColor = "blue";
