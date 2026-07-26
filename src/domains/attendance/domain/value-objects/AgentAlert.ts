import type ID from "../../../../shared/domain/value-objects/ID";
import type Label from "../../../../shared/domain/value-objects/Label";
import type Rule from "../../../../shared/domain/value-objects/Rule";

export interface IAgentAlertVO {
  id: ID;
  label: Label;
  rule: Rule;
}

export default class AgentAlert implements IAgentAlertVO {
  readonly id: ID;
  readonly label: Label;
  readonly rule: Rule;

  constructor(id: ID, label: Label, rule: Rule) {
    this.id = id;
    this.label = label;
    this.rule = rule;
  }
}
