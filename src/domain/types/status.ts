export const Status = {
  FINISHED: 0,
  IN_PROGRESS: 1,
} as const;

export type Status = (typeof Status)[keyof typeof Status];
