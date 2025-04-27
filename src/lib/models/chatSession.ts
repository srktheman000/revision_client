import { ChatSession, IMessage } from "@/types/schemaTypes";
import { Schema, model, models, Document } from "mongoose";

export interface ChatSessionDocument extends Document, ChatSession {
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "assistant", "system"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSessionSchema = new Schema<ChatSessionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.ChatSession ||
  model<ChatSessionDocument>("ChatSession", ChatSessionSchema);
