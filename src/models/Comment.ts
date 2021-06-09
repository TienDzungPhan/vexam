export interface IComment {
  id: string;
  parent?: string;
  author: string;
  // author: {
  //   id: string;
  //   name: string;
  //   avatarUrl: string;
  // };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
