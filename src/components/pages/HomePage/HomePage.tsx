import React, { useCallback, useEffect, useState } from "react";
import firebase from "@Config/firebase";
import Question from "@Modules/Question";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReplayIcon from "@material-ui/icons/Replay";
import FiltersDrawer from "@Modules/FiltersDrawer";
import questionsDB, { getQuestions } from "@Services/Question";
import { useAppDispatch, useAppSelector } from "@App/store";
import {
  selectFilters,
  selectPosition,
  selectQuestions,
  storeFilters,
  storePosition,
  storeQuestions,
} from "@Reducers/homeData";
import { Button } from "@material-ui/core";
import { TFilters } from "@Models/Question";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const storedQuestions = useAppSelector(selectQuestions);
  const storedPosition = useAppSelector(selectPosition);
  const storedFilters = useAppSelector(selectFilters);
  const [questions, setQuestions] = useState(storedQuestions);
  const loadQuestions = useCallback(
    async (filters: TFilters = storedFilters) => {
      const { examId, categories } = filters;
      let questionsRef = questionsDB as firebase.firestore.Query;
      if (examId) questionsRef = questionsRef.where("exam.id", "==", examId);
      if (categories.length > 0)
        questionsRef = questionsRef.where("category", "in", categories);
      const questionsData = await getQuestions(questionsRef);
      setQuestions(questionsData);
      dispatch(storeQuestions(questionsData));
    },
    [dispatch, storedFilters]
  );
  const handleFiltersChange = (filters: TFilters) => {
    dispatch(storeFilters(filters));
    loadQuestions(filters);
  };
  useEffect(() => {
    if (!storedQuestions) {
      loadQuestions();
    }
  }, [loadQuestions, storedQuestions]);
  useEffect(() => {
    window.scrollTo(...storedPosition);
  }, [storedPosition]);
  useEffect(() => {
    return () => {
      dispatch(storePosition([window.scrollX, window.scrollY]));
    };
  }, [dispatch]);
  return (
    <>
      {!isDesktop && (
        <FiltersDrawer
          filters={storedFilters}
          handleFiltersChange={handleFiltersChange}
        />
      )}
      <ThreeSectionsLayout
        left={
          <Filters
            filters={storedFilters}
            handleFiltersChange={handleFiltersChange}
          />
        }
        main={
          <>
            <Button
              startIcon={<ReplayIcon />}
              fullWidth
              onClick={() => loadQuestions()}
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
