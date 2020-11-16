import { cycleArray } from "./array";

describe("cycleArray", () => {
  test("cycles an array to the right", () => {
    const arr = [1, 2, 3, 4, 5];
    const cycledArr = cycleArray(arr);
    expect(cycledArr).toStrictEqual([5, 1, 2, 3, 4]);
  });
  test("accepts different shift ammount", () => {
    const arr = [1, 2, 3, 4, 5];
    const cycledArr = cycleArray(arr, 3);
    expect(cycledArr).toStrictEqual([3, 4, 5, 1, 2]);
  });
  test("shift ammount === array length", () => {
    const arr = [1, 2, 3, 4, 5];
    const cycledArr = cycleArray(arr, arr.length);
    expect(cycledArr).toStrictEqual(arr);
  });
  test("shift ammount > array length", () => {
    const arr = [1, 2, 3, 4, 5];
    const cycledArr = cycleArray(arr, 7);
    expect(cycledArr).toStrictEqual([4, 5, 1, 2, 3]);
  });
  test("shift ammount < 0>", () => {
    const arr = [1, 2, 3, 4, 5];
    const cycledArr = cycleArray(arr, -1);
    expect(cycledArr).toStrictEqual([2, 3, 4, 5, 1]);
  });
});
