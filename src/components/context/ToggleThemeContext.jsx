import React, { createContext, useContext, useState, useEffect } from "react";

const ToggleContext = createContext();

export const useToggle = () => {
  return useContext(ToggleContext);
};

export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(
    localStorage.getItem("toggle") === "false" ? false : true
  );

  useEffect(() => {
    localStorage.setItem("toggle", toggle);
  }, [toggle]);

  const handleToggleTheme = () => {
    setToggle(prev => !prev);
  };

  return (
    <ToggleContext.Provider value={{ handleToggleTheme, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
