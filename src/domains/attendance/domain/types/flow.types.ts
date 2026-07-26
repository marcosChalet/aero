import type { Status } from "../types/status";
import type { BasePassengerValues } from "../models/strategy.types";
import type { LogType } from "../types/log";
import type { Context } from "../../../core/rule-engine/types/context";
import type ID from "../../../shared/value-objects/ID";

export interface FlowState {
  currentCategory: string;
  values: Record<string, string> & Partial<BasePassengerValues>;
  context: Context;
  status: Status;
  logs: LogType[];
  completedChecklistIds: string[];
  copiedScripts: string[];
}

export interface FlowActions {
  setAsCopiedScript: (id: ID) => void;
  setCategory: (category: string) => void;
  updateValue: (id: ID, value: string) => void;
  updateContext: (key: ID, value: boolean) => void;
  resetStore: () => void;
}
