export interface IComment {
  id: string;
  parent?: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
