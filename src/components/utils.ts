/**
 * Cycles the element of the array
 */
export const cycleArray = <T>(array: T[]): T[] =>
  array.map((_, i, a) => a[i + 1 === a.length ? 0 : i + 1]);
