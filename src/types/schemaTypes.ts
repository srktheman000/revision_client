import { Document, Types } from "mongoose";

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

export type MessageRole = "user" | "assistant" | "system";

export interface IMessage {
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface ChatSession {
  user: Types.ObjectId;
  subject: Types.ObjectId;
  title: string;
  messages: IMessage[];
  lastActivity: Date;
  isActive: boolean;
  chapter?: Types.ObjectId;
}
