export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  exam: string;
  questionsCount: number;
  followersCount: number;
  createdAt: Date;
  updatedAt: Date;
}
