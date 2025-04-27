// src/app/api/chat-session/[sessionId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import ChatSession from "@/lib/models/chatSession";
import verifyUser from "@/lib/backend/verifyUser";
import { Types } from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    // Authenticate user
    const user = await verifyUser();

    // Get session ID from query string
    const sessionId = req.nextUrl.searchParams.get("sessionId");

    // Validate sessionId
    if (!sessionId || !Types.ObjectId.isValid(sessionId)) {
      return NextResponse.json(
        { success: false, message: "Invalid session ID" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    console.log("[DELETE_CHAT_SESSION]", {
      userId: user.userId,
      sessionId,
    });

    // Find the chat session and verify ownership
    const chatSession = await ChatSession.findOne({
      _id: sessionId,
      user: user.userId,
    });

    if (!chatSession) {
      return NextResponse.json(
        { success: false, message: "Chat session not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the chat session
    await ChatSession.deleteOne({ _id: sessionId });

    return NextResponse.json(
      {
        success: true,
        message: "Chat session deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[DELETE_CHAT_SESSION_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
