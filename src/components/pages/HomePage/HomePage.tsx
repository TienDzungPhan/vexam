import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "@Models/Question";
import Question from "@Modules/Question";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReplayIcon from "@material-ui/icons/Replay";
import FiltersDrawer from "@Modules/FiltersDrawer";
import { getQuestions } from "@Services/Question";
import { useAppDispatch, useAppSelector } from "@App/store";
import {
  selectPosition,
  selectQuestions,
  storePosition,
  storeQuestions,
} from "@Reducers/homeData";
import { Button } from "@material-ui/core";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const storedQuestions = useAppSelector(selectQuestions);
  const storedPosition = useAppSelector(selectPosition);
  const [questions, setQuestions] = useState(storedQuestions);
  const loadQuestions = useCallback(async () => {
    const questionsData = await getQuestions();
    setQuestions(questionsData);
    dispatch(storeQuestions(questionsData));
  }, [dispatch]);
  useEffect(() => {
    if (!storedQuestions.length) {
      loadQuestions();
    }
  }, [loadQuestions, storedQuestions]);
  useEffect(() => {
    window.scrollTo(...storedPosition);
  }, [storedPosition]);
  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-console
      console.log(window.scrollX, window.scrollY);
      dispatch(storePosition([window.scrollX, window.scrollY]));
    };
  }, [dispatch]);
  return (
    <>
      {!isDesktop && <FiltersDrawer />}
      <ThreeSectionsLayout
        left={<Filters />}
        main={
          <>
            <Button
              startIcon={<ReplayIcon />}
              fullWidth
              onClick={loadQuestions}
            >
              Reload Questions
            </Button>
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
