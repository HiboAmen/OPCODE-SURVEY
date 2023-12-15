import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const SurveyQuestion = ({ addQuestion }) => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
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

  const handleNext = () => {
    if (currentQuestionIndex < fields.length - 1) {
      setValue("currentQuestionIndex", currentQuestionIndex + 1);
      setCurrentQuestionText(fields[currentQuestionIndex + 1].text || "");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setValue("currentQuestionIndex", currentQuestionIndex - 1);
      setCurrentQuestionText(fields[currentQuestionIndex - 1].text || "");
    }
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
        {fields.map((question, index) => (
          <div key={question.id} style={{ display: index === currentQuestionIndex ? "block" : "none", marginBottom: "20px", textAlign: "center" }}>
            <div style={{ marginTop: "10px", marginBottom: "5px" }} contentEditable onBlur={(e) => handleTextChange(e.target.innerText)}>
              {question.header} {index + 1}
            </div>
            <input
              type="text"
              placeholder="Input the content of that Header here"
              value={currentQuestionIndex === index ? currentQuestionText : question.text}
              onChange={(e) => handleTextChange(e.target.value)}
              style={{ marginLeft: "10px", width: "70%" }}
            />
            <button type="button" onClick={() => remove(index)} style={{ marginLeft: "10px", marginTop: "10px" }}>
              Remove
            </button>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button type="button" onClick={handleNext} disabled={currentQuestionIndex === fields.length - 1}>
            Next
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>

      <button
        onClick={() => {
          append({ header: "Question", text: "" });
          setValue("currentQuestionIndex", fields.length);
        }}
        style={{ marginRight: "10px" }}
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
            <div key={index}>
              <h4>{question.header} {index + 1}</h4>
              <p><strong>Text:</strong> {question.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyQuestion;
