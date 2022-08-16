import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questionList, setQuestionList }) {

  function onDeleteQuestion(question) {
    const updatedList = questionList.filter((eachQuestion) => eachQuestion.id !== question.id )
    setQuestionList(updatedList)
  }

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then((resp) => resp.json())
    .then((data) => setQuestionList(data));
  }, [])

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        console.log(updatedQuestion)
        const updatedQuestions = questionList.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestionList(updatedQuestions);
      });
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionList.map((question) => (
        <QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} onAnswerChange={handleAnswerChange} /> ))}
       </ul>
    </section>
  );
}

export default QuestionList;
