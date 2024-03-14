import React from "react";
import { useToggle } from "../context/ToggleThemeContext";
import { useFont } from "../context/FontContext";

const fontClass = [
  { name: "Sans Serif", className: "font-sans" },
  { name: "Serif", className: "font-serif" },
  { name: "MonoSpace", className: "font-mono" },
];

const DropdownFont = () => {
  const { toggle } = useToggle();
  const { selectedFont, isDropdownOpen, handleCategoryChange, handleDropDown } =
    useFont();

  return (
    <section>
      <div className="relative">
        <div
          className="flex gap-3 items-center justify-center mr-2 cursor-pointer"
          onClick={handleDropDown}
        >
          <span
            className={`text-lg font-bold ${toggle && "text-[#2d2d2d]"} ${
              fontClass.find(font => font.name === selectedFont)?.className
            }`}
          >
            {selectedFont}
          </span>
          <img src="/icon-arrow-down.svg" alt="" className="h-2 mt-1" />
        </div>

        <section
          className={`absolute h-32 shadow-lg shadow-blue-500 rounded-lg w-44 left-[-70px] z-10 flex gap-2 flex-col py-3  pl-5 ${
            toggle
              ? "bg-white text-[#2d2d2d] font-bold text-2xl "
              : "bg-[#1f1f1f]"
          } transition-opacity ${
            isDropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {fontClass.map(font => (
            <div
              className={`text-[15px] cursor-pointer hover:text-[#a445ed] ${font.className}`}
              key={font.name}
              onClick={() => handleCategoryChange(font)}
            >
              {font.name}
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default DropdownFont;
