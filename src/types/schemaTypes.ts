import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface Chapter {
  title: string;
  description: string;
}

export interface SubjectDocument extends Document {
  name: string;
  description: string;
  chapters: Chapter[];
  vectorStoreID: string;
  grade: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
