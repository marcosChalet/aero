import { RuleEngineError } from "../erros/RuleEngineError";
import { resolveParentheses } from "../parser/resolveParentheses";
import type { Context } from "../types/context";

export function evaluate(expression: string, context: Context): boolean {
  if (!expression) return false;

  const clean = expression.replace(/\s+/g, "");

  return evalExpr(clean, context);
}

// 👇 exportado internamente pro parser usar
export function evalExpr(expr: string, context: Context): boolean {
  expr = resolveParentheses(expr, context);

  // NOT
  expr = expr.replace(/!([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, key) => {
    if (!(key in context)) {
      throw new RuleEngineError(`Variável não encontrada: ${key}`);
    }
    return (!context[key]).toString();
  });

  expr = expr.replace(/!(true|false)/g, (_, val) => {
    return (val !== "true").toString();
  });

  // OR split
  const orParts = expr.split("|");

  return orParts.some((part) => {
    const andParts = part.split("&");

    return andParts.every((token) => resolveValue(token, context));
  });
}

function resolveValue(token: string, context: Context): boolean {
  token = token.trim();

  if (token === "true") return true;
  if (token === "false") return false;

  if (!(token in context)) {
    throw new RuleEngineError(`Variável não encontrada: ${token}`);
  }

  return context[token];
}
