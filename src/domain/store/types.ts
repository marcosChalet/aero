import type { IconType } from "react-icons";
import type { Status } from "../types/status";
import type { LogType } from "../types/log";
import type { AggregatorType } from "../types/aggregator";

export interface InputConfig {
  id: string;
  label: string;
}

export interface AlertItem {
  id: string;
  label: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface ScriptContext {
  values: Record<string, string>;
  agentName: string;
  // possivelmente adicionar mais coisas no futuro, como:
  // currentCategory: string;
  // currentTime: string;
}

export interface ScriptItem {
  id: string;
  label: string;
  content: (ctx: Record<string, string>) => string;
}

export interface Link {
  id: string;
  title: string;
  ref: string;
  href?: string;
  type: AggregatorType;
}

export interface CategoryStrategy {
  icon: IconType;
  title: string;
  inputs: { id: string; label: string }[];
  checklist: ChecklistItem[];
  alerts: AlertItem[];
  scripts: ScriptItem[];
  links: Link[];

  // Função que decide qual checklist já está finalizado,
  // qual item está faltante, qual alerta não é mais necessário...
  autoCheck: (
    values: Record<string, string>,
    copiedScripts: string[],
  ) => string[]; // retorna IDs completados
}

/** always typed as string */
type BaseValues = {
  name: string;
  gender: string;
  pnr: string;
  ticket: string;
};

export interface GlobalState {
  currentCategory: string;
  values: Record<string, string> & Partial<BaseValues>;
  status: Status;
  logs: LogType[];
  completedChecklistIds: string[];
  copiedScripts: string[];
}

export interface GlobalActions {
  setAsCopiedScript: (id: string) => void;
  setCategory: (category: string) => void;
  updateValue: (id: string, value: string) => void;
  resetStore: () => void;
}
