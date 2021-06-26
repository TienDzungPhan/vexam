import React, { createContext, useCallback, useEffect, useState } from "react";
import { IExam } from "@Models/Exam";
import { IQuestion, TOption } from "@Models/Question";
import { v4 as uuidv4 } from "uuid";
import { getQuestionById } from "@Services/Question";
import { getExams } from "@Services/Exam";

interface IQuestionFormContext {
  questionId?: string;
  exams: IExam[];
  selectedExam: IExam | null;
  selectedCategoryName: string;
  description: string;
  textContent: string;
  title: string;
  options: TOption[];
  explanation: string;
  visibility: "public" | "private";
  optionDisabled: (option: TOption) => boolean;
  selectExam: (exam: IExam | null) => void;
  selectCategory: (categoryName: string) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

interface IProps {
  questionId?: string;
}

export const QuestionFormContext = createContext({} as IQuestionFormContext);

const QuestionFormProvider: React.FC<IProps> = ({ children, questionId }) => {
  const [exams, setExams] = useState<IExam[]>([]);
  const [question, setQuestion] = useState<IQuestion>();
  const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<TOption[]>([
    { id: uuidv4(), content: "", isCorrect: false, selectCount: 0 },
    { id: uuidv4(), content: "", isCorrect: false, selectCount: 0 },
  ]);
  const [explanation, setExplanation] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const loadExams = useCallback(async () => {
    try {
      const examsData = await getExams();
      setExams(examsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);
  const loadQuestion = useCallback(async () => {
    if (questionId) {
      try {
        const data = await getQuestionById(questionId);
        setQuestion(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }, [questionId]);
  const selectExam = (exam: IExam | null) => {
    setSelectedExam(exam);
  };
  const selectCategory = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleTextContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextContent(e.target.value);
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
  useEffect(() => {
    loadExams();
    loadQuestion();
  }, [loadExams, loadQuestion]);
  useEffect(() => {
    if (question) {
      setSelectedExam(
        exams.find((exam) => exam.id === question.exam.id) || null
      );
      setSelectedCategoryName(question.category);
      setDescription(question.description || "");
      setTitle(question.title);
      setOptions(question.options);
      setExplanation(question.explanation);
      setVisibility(question.visibility);
    }
  }, [exams, question]);
  return (
    <QuestionFormContext.Provider
      value={{
        questionId,
        exams,
        selectedExam,
        selectedCategoryName,
        description,
        textContent,
        title,
        options,
        explanation,
        visibility,
        optionDisabled,
        selectExam,
        selectCategory,
        handleDescriptionChange,
        handleTextContentChange,
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
