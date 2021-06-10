import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import Question from "@Modules/Question";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import { getQuestions } from "@Services/Question";

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const loadQuestions = useCallback(async () => {
    const questionsData = await getQuestions();
    setQuestions(questionsData);
  }, []);
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  return (
    <ThreeSectionsLayout
      left={<Filters />}
      main={
        <>
          {questions?.map((question) => (
            <Question key={question?.id} question={question} />
          ))}
        </>
      }
      right={
        <>
          <CountDown />
          <Performance />
        </>
      }
    />
  );
};

export default HomePage;
