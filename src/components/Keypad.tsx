import React from "react";
import Button from "./Button";

export interface KeypadProps {
  /** Callback fired when a button is pressed. Receives the button's value/label. */
  onPress: (value: string) => void;
}

/**
 * Layout definition for each button.
 * `label` – text shown on the button.
 * `value` – value passed to the `onPress` handler (defaults to `label`).
 * `className` – optional Tailwind classes for custom styling (e.g., spanning columns).
 */
interface KeyDef {
  label: string;
  value?: string;
  className?: string;
}

/**
 * The Keypad component renders all calculator keys in a responsive grid.
 * It delegates the actual button UI to the `Button` component.
 */
const Keypad: React.FC<KeypadProps> = ({ onPress }) => {
  // Define the keypad layout. The order of rows matters for visual layout.
  const rows: KeyDef[][] = [
    // First row – clear, sign toggle, percent, divide
    [
      { label: "C", className: "bg-red-500 hover:bg-red-600" },
      { label: "±", className: "bg-gray-300 hover:bg-gray-400" },
      { label: "%", className: "bg-gray-300 hover:bg-gray-400" },
      { label: "÷", value: "/", className: "bg-orange-500 hover:bg-orange-600" },
    ],
    // Second row – scientific functions
    [
      { label: "sin", className: "bg-indigo-500 hover:bg-indigo-600" },
      { label: "cos", className: "bg-indigo-500 hover:bg-indigo-600" },
      { label: "tan", className: "bg-indigo-500 hover:bg-indigo-600" },
      { label: "√", value: "sqrt", className: "bg-indigo-500 hover:bg-indigo-600" },
    ],
    // Third row – numbers 7‑9 and multiply
    [
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "×", value: "*", className: "bg-orange-500 hover:bg-orange-600" },
    ],
    // Fourth row – numbers 4‑6 and subtract
    [
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: "−", value: "-", className: "bg-orange-500 hover:bg-orange-600" },
    ],
    // Fifth row – numbers 1‑3 and add
    [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "+", className: "bg-orange-500 hover:bg-orange-600" },
    ],
    // Sixth row – 0 (wide), decimal point, equals
    [
      { label: "0", className: "col-span-2" },
      { label: "." },
      { label: "=", className: "bg-green-500 hover:bg-green-600" },
    ],
  ];

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <div className="grid grid-cols-4 gap-2 md:grid-cols-4">
        {rows.map((row, rowIndex) =>
          row.map((key, keyIndex) => {
            const { label, value = label, className = "" } = key;
            const handleClick = () => onPress(value);
            return (
              <Button
                key={`${rowIndex}-${keyIndex}`}
                onClick={handleClick}
                className={className}
              >
                {label}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Keypad;