import type ID from "./ID";
import type Rule from "./Rule";

export interface IAgentChecklistVO {
  id: ID;
  label: string;
  completed: boolean;
  rule: Rule;
}

export default class AgentChecklist implements IAgentChecklistVO {
  readonly id: ID;
  readonly label: string;
  readonly completed: boolean;
  readonly rule: Rule;

  constructor(id: ID, label: string, rule: Rule, completed: boolean = false) {
    this.id = id;
    this.label = label;
    this.rule = rule;
    this.completed = completed;
  }
}
