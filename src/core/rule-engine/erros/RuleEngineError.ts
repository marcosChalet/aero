export class RuleEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RuleEngineError";
  }
}
