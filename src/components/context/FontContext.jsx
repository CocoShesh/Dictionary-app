import React, { createContext, useContext, useState, useEffect } from "react";

const FontContext = createContext();

export const useFont = () => {
  return useContext(FontContext);
};

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState(
    localStorage.getItem("selectedFont") || "Sans Serif"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [font, setFont] = useState(
    localStorage.getItem("selectedFontClassName") || ""
  );

  useEffect(() => {
    localStorage.setItem("selectedFont", selectedFont);
    localStorage.setItem("selectedFontClassName", font);
  }, [selectedFont, font]);
  const handleCategoryChange = category => {
    setSelectedFont(category.name);
    setIsDropdownOpen(false);
    setFont(category.className);
  };

  const handleDropDown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <FontContext.Provider
      value={{
        handleDropDown,
        handleCategoryChange,
        selectedFont,
        isDropdownOpen,
        font,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};
