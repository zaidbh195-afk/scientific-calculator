import { Operator } from "../types";

/**
 * Utility functions for scientific calculator operations.
 * Each operation receives one or two numeric operands and returns the computed result.
 * Errors are thrown for invalid inputs (e.g., division by zero, negative square‑root, non‑integer factorial).
 */

/* ---------- Helper Functions ---------- */

/**
 * Convert degrees to radians.
 */
const degToRad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * Convert radians to degrees.
 */
const radToDeg = (rad: number): number => (rad * 180) / Math.PI;

/**
 * Compute the factorial of a non‑negative integer using an iterative approach.
 */
const factorial = (n: number): number => {
  if (n < 0) throw new Error("Factorial of a negative number is undefined");
  if (!Number.isInteger(n))
    throw new Error("Factorial is only defined for integers");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Safe division – throws on division by zero.
 */
const safeDiv = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

/* ---------- Core Operation Implementations ---------- */

export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
export const multiply = (a: number, b: number): number => a * b;
export const divide = (a: number, b: number): number => safeDiv(a, b);
export const power = (a: number, b: number): number => Math.pow(a, b);
export const sqrt = (a: number): number => {
  if (a < 0) throw new Error("Square root of negative number is undefined");
  return Math.sqrt(a);
};

export const sin = (a: number, inDegrees = true): number =>
  Math.sin(inDegrees ? degToRad(a) : a);
export const cos = (a: number, inDegrees = true): number =>
  Math.cos(inDegrees ? degToRad(a) : a);
export const tan = (a: number, inDegrees = true): number =>
  Math.tan(inDegrees ? degToRad(a) : a);

export const asin = (a: number, inDegrees = true): number => {
  const result = Math.asin(a);
  return inDegrees ? radToDeg(result) : result;
};
export const acos = (a: number, inDegrees = true): number => {
  const result = Math.acos(a);
  return inDegrees ? radToDeg(result) : result;
};
export const atan = (a: number, inDegrees = true): number => {
  const result = Math.atan(a);
  return inDegrees ? radToDeg(result) : result;
};

export const log10 = (a: number): number => {
  if (a <= 0) throw new Error("Logarithm of non‑positive number is undefined");
  return Math.log10(a);
};

export const ln = (a: number): number => {
  if (a <= 0) throw new Error("Natural logarithm of non‑positive number is undefined");
  return Math.log(a);
};

export const percent = (a: number): number => a / 100;

export const factorialOp = (a: number): number => factorial(a);

/* ---------- Operator Map ---------- */

/**
 * Mapping from operator symbols/keywords used in the UI to the corresponding function.
 * The map is typed with `Operator` (defined in src/types) for better IntelliSense.
 */
export const operationMap: Record<Operator, (...args: number[]) => number> = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "^": power,
  "√": sqrt,
  "sin": (a: number) => sin(a),
  "cos": (a: number) => cos(a),
  "tan": (a: number) => tan(a),
  "asin": (a: number) => asin(a),
  "acos": (a: number) => acos(a),
  "atan": (a: number) => atan(a),
  "log": log10,
  "ln": ln,
  "%": percent,
  "!": factorialOp,
};

/**
 * Evaluate a given operator with its operand(s).
 *
 * @param operator - The operator symbol/keyword (must be a key of `operationMap`).
 * @param a        - First operand.
 * @param b        - Optional second operand (required for binary operators).
 *
 * @returns The numeric result of the operation.
 *
 * @throws If the operator is unknown or the supplied operands are insufficient.
 */
export const calculate = (
  operator: Operator,
  a: number,
  b?: number
): number => {
  const opFn = operationMap[operator];
  if (!opFn) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  // Unary operators ignore the second argument.
  if (["√", "sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "%", "!"].includes(operator)) {
    return opFn(a);
  }

  // Binary operators require a second operand.
  if (b === undefined) {
    throw new Error(`Operator "${operator}" requires two operands`);
  }

  return opFn(a, b);
};

/* ---------- Result Formatting ---------- */

/**
 * Formats a numeric result for display:
 *  - Limits to a reasonable number of decimal places.
 *  - Removes trailing zeros.
 *  - Returns "Error" for NaN or infinite values.
 */
export const formatResult = (value: number, maxFractionDigits = 12): string => {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return "Error";
  }
  // Use toLocaleString to avoid scientific notation for typical numbers.
  return value
    .toLocaleString("en-US", {
      maximumFractionDigits: maxFractionDigits,
      useGrouping: false,
    })
    .replace(/\.?0+$/, ""); // strip trailing zeros
};
