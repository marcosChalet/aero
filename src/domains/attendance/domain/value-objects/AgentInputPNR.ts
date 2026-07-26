import type ID from "../../../../shared/domain/value-objects/ID";
import type Label from "../../../../shared/domain/value-objects/Label";
import AgentInput from "./AgentInput";

const PNR_FORMAT = /[a-zA-Z]{6}/;

export default class AgentInputPNR extends AgentInput<string> {
  private readonly _value: string;

  constructor(id: ID, label: Label, pnr: string = "") {
    super(id, label, pnr);
    this._value = pnr;
  }

  get formatted() {
    return this._value;
  }

  validate(pnr: string): boolean {
    return PNR_FORMAT.test(pnr);
  }
}
