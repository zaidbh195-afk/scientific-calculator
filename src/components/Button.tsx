import React from 'react';

export type ButtonType = 'number' | 'operator' | 'function' | 'equals' | 'clear';

export interface ButtonProps {
  /** The text/value displayed on the button */
  label: string;
  /** Callback invoked when the button is pressed */
  onClick: (value: string) => void;
  /** Optional additional Tailwind classes */
  className?: string;
  /** Visual category of the button – determines styling */
  type?: ButtonType;
}

/**
 * Reusable button component for the calculator.
 *
 * The component applies different Tailwind CSS styles based on the `type`
 * prop, while still allowing callers to extend or override styles via
 * `className`. It forwards the button's `label` to the `onClick` handler.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = '',
  type = 'number',
}) => {
  // Base styling shared by all buttons
  const baseStyles =
    'flex items-center justify-center rounded-md text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150';

  // Type‑specific styling
  const typeStyles: Record<ButtonType, string> = {
    number: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    operator: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    function: 'bg-purple-500 hover:bg-purple-600 text-white',
    equals: 'bg-green-500 hover:bg-green-600 text-white',
    clear: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const handleClick = () => {
    onClick(label);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;