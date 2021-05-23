import React from "react";
import ThreeSectionsLayout from "@Layouts/ThreeSectionsLayout";
import { IQuestion } from "@Models/Question";
import Biography from "@Modules/Biography";
import Filters from "@Modules/Filters";
import Question from "@Modules/Question";
import Performance from "@Modules/Performance";

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

const ProfilePage: React.FC = () => {
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
