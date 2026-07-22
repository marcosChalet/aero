import { RuleEngineError } from "../erros/RuleEngineError";
import type { Context } from "../types/context";

export function evaluate(expression: string, context: Context): boolean {
  const parser = new Parser(expression, context);

  const result = parser.parseExpression();

  parser.skipWhitespace();

  if (!parser.isEnd()) {
    throw new RuleEngineError(
      `Token inesperado '${parser.peek()}' na posição ${parser.position}`,
    );
  }

  return result;
}

class Parser {
  public position = 0;

  private readonly input: string;
  private readonly context: Context;

  constructor(input: string, context: Context) {
    this.input = input;
    this.context = context;
  }

  parseExpression(): boolean {
    return this.parseOr();
  }

  // OR
  private parseOr(): boolean {
    let value = this.parseAnd();

    while (true) {
      this.skipWhitespace();

      if (!this.match("|")) break;

      const right = this.parseAnd();

      value = value || right;
    }

    return value;
  }

  // AND
  private parseAnd(): boolean {
    let value = this.parseNot();

    while (true) {
      this.skipWhitespace();

      if (!this.match("&")) break;

      const right = this.parseNot();

      value = value && right;
    }

    return value;
  }

  // NOT
  private parseNot(): boolean {
    this.skipWhitespace();

    if (this.match("!")) {
      return !this.parseNot();
    }

    return this.parsePrimary();
  }

  private parsePrimary(): boolean {
    this.skipWhitespace();

    // (
    if (this.match("(")) {
      const value = this.parseExpression();

      this.skipWhitespace();

      if (!this.match(")")) {
        throw new RuleEngineError("')' esperado.");
      }

      return value;
    }

    const identifier = this.readIdentifier();

    if (identifier === "") {
      throw new RuleEngineError(
        `Token inesperado '${this.peek()}' na posição ${this.position}`,
      );
    }

    if (identifier === "true") return true;
    if (identifier === "false") return false;

    if (!(identifier in this.context)) {
      throw new RuleEngineError(`Variável não encontrada: ${identifier}`);
    }

    return this.context[identifier];
  }

  private readIdentifier(): string {
    this.skipWhitespace();

    const start = this.position;

    while (
      this.position < this.input.length &&
      /[a-zA-Z0-9_]/.test(this.input[this.position])
    ) {
      this.position++;
    }

    return this.input.slice(start, this.position);
  }

  private match(char: string): boolean {
    this.skipWhitespace();

    if (this.input[this.position] === char) {
      this.position++;
      return true;
    }

    return false;
  }

  skipWhitespace() {
    while (
      this.position < this.input.length &&
      /\s/.test(this.input[this.position])
    ) {
      this.position++;
    }
  }

  peek() {
    return this.input[this.position];
  }

  isEnd() {
    return this.position >= this.input.length;
  }
}
