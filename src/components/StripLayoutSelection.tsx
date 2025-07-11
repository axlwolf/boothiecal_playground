import React from 'react';
import { useTheme } from "./ThemeContext";
import { LayoutOption } from "../types";

interface StripLayoutSelectionProps {
  onSelectLayout: (layout: LayoutOption) => void;
}

export default function StripLayoutSelection({ onSelectLayout }: StripLayoutSelectionProps): React.JSX.Element {
  const { colors } = useTheme();
  const layouts: LayoutOption[] = [
    { id: 1, label: "1 Shot", img: "/boothiecal_playground/images/strip-1.png", shots: 1 },
    { id: 3, label: "3 Shot", img: "/boothiecal_playground/images/strip-3.png", shots: 3 },
    { id: 4, label: "4 Shot", img: "/boothiecal_playground/images/strip-4.png", shots: 4 },
    { id: 6, label: "6 Shot", img: "/boothiecal_playground/images/strip-6.png", shots: 6 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full px-2">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${colors.text} text-center`}>
        Choose Your Strip Layout
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl">
        {layouts.map(layout => (
          <button
            key={layout.id}
            onClick={() => onSelectLayout(layout)}
            className={`${colors.card} rounded-2xl shadow-xl flex flex-col items-center p-4 sm:p-6 w-full h-56 sm:h-72 transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none`}
          >
            <div className="w-full h-28 sm:h-40 flex items-center justify-center mb-4">
              <img
                src={layout.img}
                alt={layout.label}
                className="object-contain h-full"
              />
            </div>
            <span className={`mt-auto text-base sm:text-lg font-semibold ${colors.text}`}>{layout.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}