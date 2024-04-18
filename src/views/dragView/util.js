/* 取值为最小值和最大值之间 */
export const inRange = (from, to, value) => {
  if (value < from) {
    return from;
  }
  if (value > to) {
    return to;
  }
  return value;
};
