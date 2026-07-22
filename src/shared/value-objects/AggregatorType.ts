export type AggregatorType =
  (typeof AggregatorType)[keyof typeof AggregatorType];
export const AggregatorType = {
  BLUE: 0,
  GREEN: 1,
  YELLOW: 2,
} as const;
