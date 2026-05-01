import { evalExpr } from "../evaluate/evaluate";
import type { Context } from "../types/context";

export function resolveParentheses(expr: string, context: Context): string {
  while (expr.includes("(")) {
    expr = expr.replace(/\(([^()]+)\)/g, (_, sub) => {
      return evalExpr(sub, context) ? "true" : "false";
    });
  }

  return expr;
}
