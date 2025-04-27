// src/app/api/chat-session/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import ChatSession from "@/lib/models/chatSession";
import Subject from "@/lib/models/subject";
import verifyUser from "@/lib/backend/verifyUser";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    // Verify authenticated user
    const user = await verifyUser();

    // Parse request body
    const data = await req.json();
    const { subjectId, title } = data;

    // Validate required fields
    if (!subjectId || !title) {
      return NextResponse.json(
        { success: false, message: "Subject ID and title are required" },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(subjectId)) {
      return NextResponse.json(
        { success: false, message: "Invalid subject ID format" },
        { status: 400 }
      );
    }

    console.log("[CREATE_CHAT_SESSION]", {
      userId: user._id,
      subjectId,
      title,
    });

    await connectDB();

    // Verify the subject exists
    const subjectExists = await Subject.findById(subjectId);
    if (!subjectExists) {
      return NextResponse.json(
        { success: false, message: "Subject not found" },
        { status: 404 }
      );
    }

    // Create new chat session
    const newChatSession = await ChatSession.create({
      user: user.userId,
      subject: subjectId,
      title,
      messages: [],
      lastActivity: new Date(),
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chat session created successfully",
        data: newChatSession,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("[CREATE_CHAT_SESSION_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
