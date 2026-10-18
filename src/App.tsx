import React from "react";
import Calculator from "./components/Calculator";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Calculator />
      </div>
    </div>
  );
};

export default App;