import React, { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyQuestions from "./SurveyQuestions";
import { Resizable } from "react-resizable";
import "./SurveyFormContainer.css";

const SurveyFormContainer = () => {
  const [surveyBackgroundColor, setSurveyBackgroundColor] = useState("#f0f0f0");
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(0);
  const [components, setComponents] = useState([
    { type: "header", backgroundColor: "#fff", text: "Survey Form", textColor: "#000", width: 200, height: 50, x: 50, y: 50 },
    { type: "questions", backgroundColor: "#fff", header: "Questions", textColor: "#000", questions: [], width: 200, height: 100, x: 300, y: 50 },
  ]);

  const handleColorChange = (newColor, property) => {
    setComponents((prev) =>
      prev.map((component, index) => {
        if (index === selectedComponentIndex) {
          return { ...component, [property]: newColor };
        } else {
          return component;
        }
      })
    );
  };

  const handleComponentSelectionChange = (index) => {
    setSelectedComponentIndex(index);
  };

  const handleQuestionTextResize = (e, { size }) => {
    const updatedComponents = [...components];
    updatedComponents[selectedComponentIndex].width = size.width;
    updatedComponents[selectedComponentIndex].height = size.height;
    setComponents(updatedComponents);
  };

  const handleHeaderTextChange = (e) => {
    const updatedComponents = [...components];
    updatedComponents[selectedComponentIndex].text = e.target.innerText;
    setComponents(updatedComponents);
  };

  const saveChanges = () => {
    const userChanges = components.map(({ type, ...rest }) => rest);
    console.log("Save changes:", userChanges);
    // Further actions with userChanges, e.g., send to server, update state, etc.
    // setComponents([]); // Uncomment if you want to clear components after saving changes
  };

  return (
    <div className="survey-form-container" style={{ backgroundColor: surveyBackgroundColor, position: "relative" }}>
      <div className="color-buttons">
        <label>
          Background:
          <input
            type="color"
            value={components[selectedComponentIndex].backgroundColor}
            onChange={(e) => handleColorChange(e.target.value, "backgroundColor")}
          />
        </label>

        <label>
          Text:
          <input
            type="color"
            value={components[selectedComponentIndex].textColor}
            onChange={(e) => handleColorChange(e.target.value, "textColor")}
          />
        </label>

        <label>
          Survey Background Color:
          <input
            type="color"
            value={surveyBackgroundColor}
            onChange={(e) => setSurveyBackgroundColor(e.target.value)}
          />
        </label>
      </div>

      <div className="options-panel">
        <div>
          <label>Select Component: </label>
          <select onChange={(e) => handleComponentSelectionChange(parseInt(e.target.value))}>
            {components.map((_, i) => (
              <option key={i} value={i}>
                Component {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {components.map((component, index) => (
        <Resizable
          key={index}
          width={component.width || 200}
          height={component.height || 100}
          onResize={handleQuestionTextResize}
          handle={<div className="resize-handle" />}
        >
          <div
            key={index}
            style={{ backgroundColor: component.backgroundColor, color: component.textColor }}
          >
            {component.type === "header" && (
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={handleHeaderTextChange}
                dangerouslySetInnerHTML={{ __html: component.text }}
              />
            )}
            {component.type === "questions" && (
              <SurveyQuestions
                header={component.header}
                questions={component.questions}
                onHeaderChange={(newHeader) => {
                  const updatedComponents = [...components];
                  updatedComponents[index].header = newHeader;
                  setComponents(updatedComponents);
                }}
              />
            )}
          </div>
        </Resizable>
      ))}

      <SurveyForm
        addQuestion={(questionText) => {
          setComponents((prev) => {
            const questionsComponent = prev.find((comp) => comp.type === "questions");
            questionsComponent.questions.push({
              text: questionText,
              backgroundColor: "#ccb7b7",
              width: 200,
              height: 30,
            });
            return [...prev];
          });
        }}
      />

      <button onClick={saveChanges}>Save Changes</button>
    </div>
  );
};

export default SurveyFormContainer;
