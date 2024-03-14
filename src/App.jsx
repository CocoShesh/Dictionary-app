import React from "react";
import DictionarySearchInput from "./components/DictionarySearchInput";
import { ToggleProvider } from "./components/context/ToggleThemeContext";
import { FontProvider } from "./components/context/FontContext";
function App() {
  return (
    <FontProvider>
      <ToggleProvider>
        <DictionarySearchInput />
      </ToggleProvider>
    </FontProvider>
  );
}

export default App;
