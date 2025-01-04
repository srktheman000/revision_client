export enum Role {
  Student = "student",
  Parent = "parent",
}

export type Student = {
  role: Role.Student;
  name: string;
  age: number;
};

export type Parent = {
  role: Role.Parent;
  name: string;
  childrenCount: number;
};

export interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export interface Chapter {
  id: number;
  title: string;
  sections: string[];
}

export interface TopBarProps {
  title: string;
  grade: string;
  onBackClick?: () => void;
  onMinimizeClick?: () => void;
}

export interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date | string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface TimelineEvent {
  year: string;
  title: string;
  image: string;
}

export interface ListItem {
  title: string;
  description: string;
  image: string;
}

export interface QuizQuestion {
  text: string;
  options: string[];
}

export interface TimelineCardProps {
  events?: TimelineEvent[];
}

export interface InteractiveListProps {
  items?: ListItem[];
}

export interface KnowledgeTestProps {
  question?: QuizQuestion;
  onAnswer?: (answerId: string) => void;
  isAnswered?: boolean;
}

export interface BaseMessage {
  type: "text" | "timeline" | "list" | "quiz" | "summary";
  isUser: boolean;
  timestamp?: Date;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

export interface SummaryPoint {
  title: string;
  description: string;
  isComplete?: boolean;
}

export interface SummaryMessage extends BaseMessage {
  type: "summary";
  content: {
    title: string;
    points: SummaryPoint[];
  };
}

export interface TimelineMessage extends BaseMessage {
  type: "timeline";
  content: {
    title?: string;
    description?: string;
    events: TimelineEvent[];
  };
}

export interface ListMessage extends BaseMessage {
  type: "list";
  content: {
    title?: string;
    description?: string;
    items: ListItem[];
  };
}

export interface QuizMessage extends BaseMessage {
  type: "quiz";
  content: QuizQuestion;
  userAnswer?: string;
  isAnswered?: boolean;
}

export type MessageType =
  | TextMessage
  | TimelineMessage
  | ListMessage
  | QuizMessage
  | SummaryMessage;
