import React, { useCallback, useEffect, useState } from "react";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import { IQuestion } from "@Models/Question";
import Biography from "@Modules/Biography";
import Filters from "@Modules/Filters";
import Question from "@Modules/Question";
import Performance from "@Modules/Performance";
import questionsDB from "@Services/Question";

const ProfilePage: React.FC = () => {
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
          <Biography />
          <Performance />
        </>
      }
    />
  );
};

export default ProfilePage;
