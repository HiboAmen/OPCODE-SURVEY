import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const SurveyForm = ({ addQuestion }) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      questions: [{ header: "Question", text: "" }],
      currentQuestionIndex: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const [reviewVisible, setReviewVisible] = useState(false);

  useEffect(() => {
    if (fields.length > 0) {
      setCurrentQuestionText(fields[fields.length - 1].text || "");
    }
  }, [fields]);

  const currentQuestionIndex = watch("currentQuestionIndex");

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  const handleTextChange = (text) => {
    setCurrentQuestionText(text);
    setValue(`questions[${currentQuestionIndex}].text`, text);
  };

  const handleReview = () => {
    setReviewVisible(true);
  };

  return (
    <div className="survey-form" style={{ padding: "20px", border: "1px solid #ccc" }}>
      <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
        {fields.map((question, index) => (
          <div key={question.id} style={{ marginBottom: "20px" }}>
            <div style={{ marginTop: "10px", marginBottom: "5px" }} contentEditable onBlur={(e) => handleTextChange(e.target.innerText)}>
              {question.header} {index + 1}
            </div>
            <input
              type="text"
              placeholder="Input the content of that Header here"
              value={currentQuestionIndex === index ? currentQuestionText : question.text}
              onChange={(e) => handleTextChange(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <button type="button" onClick={() => remove(index)} style={{ marginBottom: "10px" }}>
              Remove
            </button>
          </div>
        ))}
      </form>

      <button
        onClick={() => {
          append({ header: "Question", text: "" });
          setValue("currentQuestionIndex", fields.length);
        }}
        style={{ marginBottom: "10px" }}
      >
        Add Question
      </button>

      <button onClick={handleReview}>
        Review
      </button>

      {reviewVisible && (
        <div style={{ marginTop: "20px" }}>
          <h3>Review Inputs</h3>
          {fields.map((question, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h4>{question.header} - Question {index + 1}</h4>
              <p><strong>Text:</strong> {question.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
