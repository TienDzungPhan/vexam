import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import Question from "@Modules/Question";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import questionsDB from "@Services/Question";

const HomePage: React.FC = () => {
  const [questions, setQuestions] = useState([] as IQuestion[]);
  const loadQuestions = useCallback(async () => {
    const questionsSnapshot = await questionsDB.get();
    const questionsData = [] as IQuestion[];
    questionsSnapshot.forEach((doc) => {
      questionsData.push({ id: doc.id, ...doc.data() } as IQuestion);
    });
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
