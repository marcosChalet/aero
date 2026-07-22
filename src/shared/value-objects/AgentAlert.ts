import type ID from "./ID";
import type Rule from "./Rule";

export type LabelType = string;

export interface IAgentAlertVO {
  id: ID;
  label: LabelType;
  rule: Rule;
}

export default class AgentAlert implements IAgentAlertVO {
  readonly id: ID;
  readonly label: LabelType;
  readonly rule: Rule;

  constructor(id: ID, label: LabelType, rule: Rule) {
    this.id = id;
    this.label = label;
    this.rule = rule;
  }
}
