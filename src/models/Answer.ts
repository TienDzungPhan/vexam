export interface IAnswer {
  id: string;
  user: string;
  question: string;
  content: string;
  isCorrect: boolean;
  createdAt: Date;
}
