import { evaluate } from "../evaluate/evaluate";
import type { Context } from "../types/context";
import type { RuleResult } from "../types/result";

export function validate(expression: string, context: Context): RuleResult {
  try {
    evaluate(expression, context);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro inválido",
    };
  }
}
