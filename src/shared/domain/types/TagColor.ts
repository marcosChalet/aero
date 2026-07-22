export type TagColor = (typeof TagColor)[keyof typeof TagColor];
export const TagColor = {
  NONE: "none",
  BLUE: "blue",
  GREEN: "green",
  YELLOW: "yellow",
} as const;
