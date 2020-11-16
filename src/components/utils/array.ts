/**
 * Cycles elements of an array to the right.
 * Pass -ve `shiftBy` value to cycle the array the left.
 */
export const cycleArray = <T>(array: T[], shiftBy: number = 1): T[] => {
  const breakpoint = (array.length - shiftBy) % array.length;
  const back = array.slice(0, breakpoint);
  const front = array.slice(breakpoint);
  return [...front, ...back];
};
