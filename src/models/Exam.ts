export type TSection = {
  name: string;
  description: string;
};

export type TCategory = {
  name: string;
  description: string;
  section: string;
  quantity: number;
  hasContext: boolean;
};

export interface IExam {
  id: string;
  name: string;
  description: string;
  language: string;
  organization: string;
  authorId: string;
  sections?: TSection[];
  categories: TCategory[];
  createdAt: Date;
  updatedAt: Date;
}
