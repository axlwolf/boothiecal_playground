import React from "react";
import { useTheme } from "./ThemeContext";
import { ButtonProps } from "../types";

const BackButton: React.FC<ButtonProps> = ({ onClick, children = "Back", className = "", disabled = false }) => {
  const { colors } = useTheme();
  return (
    <button
      className={`flex items-center gap-2 px-6 py-3 rounded border-2 ${colors.button} font-elegancia-body font-bold uppercase tracking-wider shadow-elegancia hover:shadow-elegancia-interactive transition-all duration-300 focus:outline-none active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>{children}</span>
    </button>
  );
};

export default BackButton;
