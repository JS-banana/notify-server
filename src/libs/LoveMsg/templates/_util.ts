/**
 * 生成 min ≤ r ≤ max 随机整数 [min, max]
 */
export const getRandomRange = (min: number, max: number): number => {
  return Math.round(Math.random() * (max - min)) + min
}
