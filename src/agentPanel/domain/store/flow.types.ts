import type { Status } from "../types/status";
import type { BasePassengerValues } from "../models/strategy.types";
import type { LogType } from "../types/log";

export interface FlowState {
  currentCategory: string;
  values: Record<string, string> & Partial<BasePassengerValues>;
  status: Status;
  logs: LogType[];
  completedChecklistIds: string[];
  copiedScripts: string[];
}

export interface FlowActions {
  setAsCopiedScript: (id: string) => void;
  setCategory: (category: string) => void;
  updateValue: (id: string, value: string) => void;
  resetStore: () => void;
}
