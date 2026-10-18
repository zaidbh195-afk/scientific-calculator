import React from "react";

interface DisplayProps {
  /** The current input or expression entered by the user */
  expression: string;
  /** The evaluated result of the expression (if available) */
  result?: string;
}

/**
 * Display component for the scientific calculator.
 *
 * Shows the current expression on the top line and the evaluated result
 * (when provided) on the bottom line. The component is fully responsive
 * and uses Tailwind CSS for styling.
 *
 * @param {DisplayProps} props - Component props
 * @returns {JSX.Element}
 */
const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  return (
    <div className="w-full bg-gray-900 text-white rounded-lg p-4 flex flex-col justify-end items-end min-h-[120px] md:min-h-[150px] shadow-inner">
      {/* Expression (user input) */}
      <div
        className="text-lg md:text-xl lg:text-2xl font-mono whitespace-pre-wrap break-all text-right w-full"
        aria-label="Current expression"
        aria-live="polite"
      >
        {expression || "0"}
      </div>

      {/* Result (calculated value) */}
      {result !== undefined && result !== "" && (
        <div
          className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold mt-2 text-right w-full"
          aria-label="Result"
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default Display;