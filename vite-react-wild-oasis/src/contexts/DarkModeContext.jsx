import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [darkMode]);

  const handleSwitch = () => {
    setDarkMode((darkMode) => !darkMode);
  };
  const context = { darkMode, handleSwitch };
  return (
    <DarkModeContext.Provider value={context}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === "undefined")
    throw new Error("This component is not wrapped by DarkModeProvider");
  return context;
}

export {useDarkMode, DarkModeProvider};
