import React, { useState } from "react";
import Landing from "./components/Landing";
import Photobooth from "./components/Photobooth";
import { ThemeProvider } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  const [showBooth, setShowBooth] = useState<boolean>(false);

  return (
    <ThemeProvider>
      <ThemeToggle />
      {showBooth ? (
        <Photobooth onBack={() => setShowBooth(false)} />
      ) : (
        <Landing onStart={() => setShowBooth(true)} />
      )}
    </ThemeProvider>
  );
};

export default App;
