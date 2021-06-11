import React, { useCallback, useContext, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import TwoSectionsLayout from "@Layouts/TwoSectionsLayout";
import QuestionContent from "@Core/QuestionContent";
import QuestionDescription from "@Core/QuestionDescription";
import QuestionCategory from "@Core/QuestionCategory";
import AnswersCount from "@Core/AnswersCount";
import QuestionActions from "@Core/QuestionActions";
import Comments from "@Modules/Comments";
import CommentForm from "@Modules/CommentForm";
import { useParams } from "react-router-dom";
import { getQuestionById } from "@Services/Question";
import { AuthContext } from "@Contexts/AuthContext";
import { DialogContext } from "@Contexts/DialogContext";
import useStyles from "./QuestionPage.styles";

const QuestionPage: React.FC = () => {
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const { authenticated } = useContext(AuthContext);
  const { handleDialogOpen } = useContext(DialogContext);
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const loadQuestion = useCallback(async () => {
    try {
      const data = await getQuestionById(id);
      setQuestion(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [id]);
  const handleReveilAnswer = useCallback(() => {
    if (authenticated) setAnswered(true);
    else handleDialogOpen("log-in")();
  }, [authenticated, handleDialogOpen]);
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedContent(e.target.value);
  };
  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);
  useEffect(() => {
    if (!authenticated) setAnswered(false);
  }, [authenticated]);
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
              question={question}
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
