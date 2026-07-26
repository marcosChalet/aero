import AgentInput from "../../../domains/attendance/domain/value-objects/AgentInput";
import AgentInputName from "../../../domains/attendance/domain/value-objects/AgentInputName";
import type ID from "./ID";
import type Label from "./Label";

const MIN_NAME_LENGTH = 3;
const INCLUDE_NUMBERS = /\d/;
const INCLUDE_SYMBOLS = /[*/@#$%&]/;

export default class Name extends AgentInput<string> {
  readonly value: string;

  constructor(id: ID, label: Label, name: string = "") {
    super(id, label, name);

    // if (!this.validate(value)) {
    //   throw new Error(
    //     "An valid name not contains numbers, symbols and contains +3 characters",
    //   );
    // }

    this.value = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  updateName(name: string) {
    return new AgentInputName(this.id, this.label, name);
  }

  validate(nameToValidate: string = "") {
    const name = nameToValidate || this.value;
    return (
      name !== "" &&
      name.length >= MIN_NAME_LENGTH &&
      !INCLUDE_NUMBERS.test(name) &&
      !INCLUDE_SYMBOLS.test(name)
    );
  }

  isEqual(name: AgentInputName) {
    return this.value === name.value;
  }
}
