import React, { useState } from "react";
import { IQuestion } from "@Models/Question";
import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import QuestionContent from "@Core/QuestionContent";
import QuestionDescription from "@Core/QuestionDescription";
import QuestionCategory from "@Core/QuestionCategory";
import AnswersCount from "@Core/AnswersCount";
import QuestionActions from "@Core/QuestionActions";
import Comments from "@Modules/Comments";
import CommentForm from "@Modules/CommentForm";
import { Timestamp } from "@Config/firestore";
import useStyles from "./QuestionPage.styles";

const question: IQuestion = {
  id: "1",
  createdAt: Timestamp.fromDate(new Date("May 16, 2021 16:57:12")),
  updatedAt: Timestamp.fromDate(new Date("May 21, 2021 16:57:12")),
  exam: "JLPT N5",
  author: "Dzung Phan",
  visibility: "Public",
  category: "Kanji Reading",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  title: "日本語は、（簡単）です。",
  options: [
    {
      id: "1",
      content: "かんたん",
      isCorrect: true,
    },
    {
      id: "2",
      content: "かんだん",
      isCorrect: false,
    },
    {
      id: "3",
      content: "がんたん",
      isCorrect: false,
    },
    {
      id: "4",
      content: "がんだん",
      isCorrect: false,
    },
  ],
  explanation:
    "Fusce ullamcorper sem felis, eleifend finibus erat pretium eget. Nam vestibulum a mi id mattis.",
};

const QuestionPage: React.FC = () => {
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
    <TwoSectionsLayout
      nofixed
      main={
        <>
          <QuestionContent
            variant="detailed"
            question={question}
            answered={answered}
            selectedContent={selectedContent}
            handleOptionChange={handleOptionChange}
          />
          <QuestionCategory variant="detailed" question={question} />
          <div className={styles.answersCountAndActions}>
            <AnswersCount variant="detailed" />
            <QuestionActions
              variant="detailed"
              answered={answered}
              selectedContent={selectedContent}
              handleReveilAnswer={handleReveilAnswer}
            />
          </div>
          {answered && (
            <>
              <CommentForm />
              <Comments question={question} />
            </>
          )}
        </>
      }
      right={<QuestionDescription variant="detailed" question={question} />}
    />
  );
};

export default QuestionPage;
