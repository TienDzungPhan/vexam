import React from "react";
import { IQuestion } from "@Models/Question";
import Question from "@Modules/Question";
import { Grid } from "@material-ui/core";
import Filters from "@Modules/Filters";
import CountDown from "@Core/CountDown";
import Performance from "@Modules/Performance";
import useStyles from "./HomePage.styles";

const questions: IQuestion[] = [
  {
    id: "1",
    createdAt: new Date("May 16, 2021 16:57:12"),
    updatedAt: new Date("May 21, 2021 16:57:12"),
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
  },
  {
    id: "2",
    createdAt: new Date("May 16, 2021 16:57:12"),
    updatedAt: new Date("May 21, 2021 16:57:12"),
    exam: "JLPT N5",
    author: "Dzung Phan",
    visibility: "Public",
    category: "Grammar",
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
  },
];

const HomePage: React.FC = () => {
  const styles = useStyles();
  return (
    <Grid container spacing={0}>
      <Grid item md={4}>
        <div className={styles.leftSide}>
          <Filters />
        </div>
      </Grid>
      <Grid item md={4}>
        {questions?.map((question) => (
          <Question key={question?.id} question={question} />
        ))}
      </Grid>
      <Grid item md={4}>
        <div className={styles.rightSide}>
          <CountDown />
          <Performance />
        </div>
      </Grid>
    </Grid>
  );
};

export default HomePage;
