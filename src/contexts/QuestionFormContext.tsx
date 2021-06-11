import React, { createContext, useState } from "react";
import { IExam, TCategory } from "@Models/Exam";
import { TOption } from "@Models/Question";
import { v4 as uuidv4 } from "uuid";

interface IQuestionFormContext {
  selectedExam: IExam | null;
  selectedCategory: TCategory | null;
  description: string;
  title: string;
  options: TOption[];
  explanation: string;
  visibility: "public" | "private";
  optionDisabled: (option: TOption) => boolean;
  selectExam: (exam: IExam | null) => void;
  selectCategory: (category: TCategory | null) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionContentChange: (
    id: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOptionCreate: () => void;
  handleOptionDelete: (id: string) => () => void;
  handleExplanationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVisibilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionFormContext = createContext({} as IQuestionFormContext);

const QuestionFormProvider: React.FC = ({ children }) => {
  const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<TCategory | null>(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<TOption[]>([
    { id: uuidv4(), content: "", isCorrect: false, selectCount: 0 },
    { id: uuidv4(), content: "", isCorrect: false, selectCount: 0 },
  ]);
  const [explanation, setExplanation] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const selectExam = (exam: IExam | null) => {
    setSelectedExam(exam);
  };
  const selectCategory = (category: TCategory | null) => {
    setSelectedCategory(category);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleOptionContentChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = options.map((option) => {
        const newOption = option;
        newOption.isCorrect = false;
        if (option.id === id) newOption.content = e.target.value;
        return newOption;
      });
      setOptions(newOptions);
    };
  const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((option) => {
      const newOption = option;
      if (option.id === e.target.value) newOption.isCorrect = true;
      else newOption.isCorrect = false;
      return newOption;
    });
    setOptions(newOptions);
  };
  const handleOptionCreate = () => {
    setOptions([
      ...options,
      {
        id: uuidv4(),
        content: "",
        isCorrect: false,
        selectCount: 0,
      },
    ]);
  };
  const handleOptionDelete = (id: string) => () => {
    setOptions(options.filter((option) => option.id !== id));
  };
  const optionDisabled = (option: TOption) => {
    const isBlank = !option.content;
    const isDuplicated =
      options.filter(
        (currentOption) => currentOption.content === option.content
      ).length > 1;
    return isBlank || isDuplicated;
  };
  const handleExplanationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(e.target.value);
  };
  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as "public" | "private");
  };
  return (
    <QuestionFormContext.Provider
      value={{
        selectedExam,
        selectedCategory,
        description,
        title,
        options,
        explanation,
        visibility,
        optionDisabled,
        selectExam,
        selectCategory,
        handleDescriptionChange,
        handleTitleChange,
        handleOptionContentChange,
        handleOptionSelect,
        handleOptionCreate,
        handleOptionDelete,
        handleExplanationChange,
        handleVisibilityChange,
      }}
    >
      {children}
    </QuestionFormContext.Provider>
  );
};

export default QuestionFormProvider;
