import AgentInput from "../../../domains/attendance/domain/value-objects/AgentInput";
import type ID from "./ID";
import type Label from "./Label";

const NOT_NUMBERS = /\D/g;
const NUM_DIGITS_CPF = 11;
const CPF_BLOCS = /(\d{3})(\d{3})(\d{3})(\d{2})/;
const CPF_MASK = "$1.$2.$3-$4";

export default class CPF extends AgentInput<string> {
  private readonly _value: string;

  constructor(id: ID, label: Label, cpf: string = "") {
    super(id, label, cpf);

    // if (!cpf) throw new Error("CPF é obrigatório");
    const cleanValue = cpf.replace(NOT_NUMBERS, "");

    // if (!this.validate(cleanValue)) {
    //   throw new Error("CPF inválido.");
    // }

    this._value = cleanValue;
  }

  get formatted() {
    return this._value.replace(CPF_BLOCS, CPF_MASK);
  }

  validate(cpf: string): boolean {
    return cpf.length === NUM_DIGITS_CPF;
  }
}
