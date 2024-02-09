// ThemeContext.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark_theme");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark_theme" ? "light_theme" : "dark_theme"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
