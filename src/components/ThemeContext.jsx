import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark_theme");

  useEffect(() => {
    if (theme === "light_theme") {
      document.documentElement.classList.remove("dark_theme");
      document.documentElement.classList.add("light_theme");
    } else {
      document.documentElement.classList.remove("light_theme");
      document.documentElement.classList.add("dark_theme");
    }

    return () => {
      document.documentElement.classList.remove("dark_theme", "light_theme");
    };
  }, [theme]);

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
