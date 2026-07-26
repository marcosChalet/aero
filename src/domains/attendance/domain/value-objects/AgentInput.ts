import type ID from "../../../../shared/domain/value-objects/ID";
import type Label from "../../../../shared/domain/value-objects/Label";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IAgentInputVO<T = any> {
  id: ID;
  label: Label;
  displayValue(): string;
  validate(p: T): boolean;
}

export default class AgentInput<T = string> implements IAgentInputVO<T> {
  readonly id: ID;
  readonly label: Label;
  readonly value: string;

  constructor(id: ID, label: Label, value: string) {
    this.id = id;
    this.label = label;
    this.value = value;
  }

  displayValue(): string {
    return this.value;
  }

  // @override
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_value: T): boolean {
    return true;
  }
}
