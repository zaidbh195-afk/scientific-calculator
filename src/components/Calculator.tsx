import React, { useState, useCallback } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import { evaluateExpression } from "../utils/operations";

/**
 * Main Calculator component.
 *
 * It keeps track of the current input expression and the evaluated result.
 * All button presses are funneled through `handleButtonPress`, which updates
 * the expression or performs special actions (clear, delete, evaluate, etc.).
 *
 * The component is styled with Tailwind CSS and is fully responsive.
 */
const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("0");

  /**
   * Updates the expression based on the pressed button label.
   * Handles special keys like "C", "⌫", "=" and also appends regular characters.
   */
  const handleButtonPress = useCallback(
    (label: string) => {
      switch (label) {
        case "C": // Clear all
          setExpression("");
          setResult("0");
          break;

        case "⌫": // Backspace / delete last character
          setExpression((prev) => prev.slice(0, -1));
          break;

        case "=": {
          // Evaluate the current expression
          try {
            const evalResult = evaluateExpression(expression);
            setResult(evalResult);
          } catch (e) {
            setResult("Error");
          }
          break;
        }

        default:
          // Append the pressed key to the expression
          setExpression((prev) => prev + label);
          break;
      }
    },
    [expression]
  );

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 bg-gray-100 rounded-xl shadow-lg">
      {/* Display shows the current expression and the result */}
      <Display expression={expression} result={result} />

      {/* Keypad contains all calculator buttons */}
      <Keypad onButtonPress={handleButtonPress} />
    </div>
  );
};

export default Calculator;