import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import Question from "@Modules/Question";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import FiltersDrawer from "@Modules/FiltersDrawer";
import { getQuestions } from "@Services/Question";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [questions, setQuestions] = useState([] as IQuestion[]);
  const loadQuestions = useCallback(async () => {
    const questionsData = await getQuestions();
    setQuestions(questionsData);
  }, []);
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  return (
    <>
      {!isDesktop && <FiltersDrawer />}
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
    </>
  );
};

export default HomePage;
