import React, { useState } from "react";
import { IQuestion } from "@Models/Question";
import { Card, Divider } from "@material-ui/core";
import QuestionContent from "@Core/QuestionContent";
import QuestionDescription from "@Core/QuestionDescription";
import QuestionCategory from "@Core/QuestionCategory";
import AnswersCount from "@Core/AnswersCount";
import QuestionActions from "@Core/QuestionActions";
import useStyles from "./Question.styles";

interface IProps {
  question: IQuestion;
}

const Question: React.FC<IProps> = ({ question }) => {
  const styles = useStyles();
  const [answered, setAnswered] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const handleReveilAnswer = () => {
    setAnswered(true);
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContent(e.target.value);
  };
  return (
    <Card className={styles.question}>
      <QuestionCategory question={question} />
      <QuestionDescription question={question} />
      <Divider variant="middle" />
      <QuestionContent
        question={question}
        answered={answered}
        selectedContent={selectedContent}
        handleOptionChange={handleOptionChange}
      />
      <AnswersCount />
      <QuestionActions
        question={question}
        answered={answered}
        selectedContent={selectedContent}
        handleReveilAnswer={handleReveilAnswer}
      />
    </Card>
  );
};

export default Question;
