// App.js
import React, { useState } from "react";
import SurveyFormContainer from "./SurveyFormContainer";
import "./App.css";

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");

  const handleColorChange = (newColor) => {
    setBackgroundColor(newColor);
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <SurveyFormContainer onColorChange={handleColorChange} />
    </div>
  );
};

export default App;
