import React from "react";
import Questions from "./Questions";
const QuestionList = ({ questionList }) => {
  console.log(questionList)
  return (
    <div>
      {questionList?.map((question,index) => (
        <Questions question={question} key ={index} >{index}</Questions>
      ))}
    </div>
  );
};

export default QuestionList;