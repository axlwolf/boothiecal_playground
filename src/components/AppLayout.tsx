import React from "react";
import { useTheme } from "./ThemeContext";
import { BasicComponentProps } from "../types";

interface AppLayoutProps extends BasicComponentProps {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <div className={`${colors.animatedBg} min-h-screen flex items-center justify-center relative transition-all duration-1000`}>
      {/* Page Content */}
      <div className="w-full h-full flex flex-col items-center justify-center animate-fadeInUp">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;

