export type TOption = {
  id: string;
  content: string;
  isCorrect: boolean;
};

export interface IQuestion {
  id: string;
  exam: string;
  author: string;
  visibility: string;
  category: string;
  description: string;
  title: string;
  options: TOption[];
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
}
