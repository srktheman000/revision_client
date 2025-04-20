import { Chapter, SubjectDocument } from "@/types/schemaTypes";
import { Schema, model, models } from "mongoose";

const ChapterSchema = new Schema<Chapter>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const SubjectSchema = new Schema<SubjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    chapters: {
      type: [ChapterSchema],
      default: [],
    },
    vectorStoreID: {
      type: String,
      default: "",
    },
    grade: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "/api/placeholder/400/300",
    },
  },
  { timestamps: true }
);

export default models.Subject ||
  model<SubjectDocument>("Subject", SubjectSchema);
