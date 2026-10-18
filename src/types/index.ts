// src/types/index.ts

/** 
 * Types and interfaces used across the Scientific Calculator project.
 * This file centralizes shared type definitions to ensure consistency
 * between components, utils and state management.
 */

/* -------------------------------------------------------------------------- */
/*                                   Enums                                   */
/* -------------------------------------------------------------------------- */

/**
 * Category of a calculator button.
 * - `Number`   : Digits and decimal point.
 * - `Operator` : Basic arithmetic operators and scientific functions.
 * - `Function` : Clear, delete, toggle sign, etc.
 * - `Equals`   : The "=" button.
 */
export enum ButtonCategory {
  Number = 'number',
  Operator = 'operator',
  Function = 'function',
  Equals = 'equals',
}

/**
 * Supported arithmetic and scientific operators.
 * Extend this enum when new operations are added to `src/utils/operations.ts`.
 */
export enum Operator {
  Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Power = '^',
  Modulo = '%',
  SquareRoot = '√',
  Factorial = '!',
  Negate = '±',
}

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Signature of a binary operation function.
 * Example: (a, b) => a + b
 */
export type BinaryOperation = (a: number, b: number) => number;

/**
 * Signature of a unary operation function.
 * Example: (a) => Math.sqrt(a)
 */
export type UnaryOperation = (a: number) => number;

/**
 * The shape of the calculator's internal state.
 */
export interface CalculatorState {
  /** The value currently being entered or the result of the last evaluation. */
  current: string;
  /** The previous operand stored when an operator is selected. */
  previous: string;
  /** The operator that is pending execution, if any. */
  operation: Operator | null;
  /** When true, the next digit press should overwrite `current`. */
  overwrite: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Props Types                                 */
/* -------------------------------------------------------------------------- */

/**
 * Props for the `Display` component.
 */
export interface DisplayProps {
  /** The string that should be shown on the calculator screen. */
  value: string;
}

/**
 * Props for the generic `Button` component.
 */
export interface ButtonProps {
  /** Text/label displayed on the button (e.g., "7", "+", "C"). */
  label: string;
  /** Callback invoked when the button is clicked. */
  onClick: (value: string) => void;
  /** Optional additional Tailwind classes for styling. */
  className?: string;
  /** Category of the button – influences styling & behaviour. */
  category?: ButtonCategory;
}

/**
 * Props for the `Keypad` component – a container for all calculator buttons.
 */
export interface KeypadProps {
  /** Handler that receives the label of the button that was pressed. */
  onButtonPress: (value: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                               Export Helpers                                 */
/* -------------------------------------------------------------------------- */

/**
 * Mapping from an `Operator` enum value to its implementation.
 * The actual functions live in `src/utils/operations.ts`.
 */
export interface OperationMap {
  [Operator.Add]: BinaryOperation;
  [Operator.Subtract]: BinaryOperation;
  [Operator.Multiply]: BinaryOperation;
  [Operator.Divide]: BinaryOperation;
  [Operator.Power]: BinaryOperation;
  [Operator.Modulo]: BinaryOperation;
  [Operator.SquareRoot]: UnaryOperation;
  [Operator.Factorial]: UnaryOperation;
  [Operator.Negate]: UnaryOperation;
}

/* -------------------------------------------------------------------------- */
/*                                 Defaults                                    */
/* -------------------------------------------------------------------------- */

/**
 * The initial state for the calculator.
 */
export const initialCalculatorState: CalculatorState = {
  current: '0',
  previous: '',
  operation: null,
  overwrite: false,
};