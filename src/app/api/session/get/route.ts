// src/app/api/chat-session/messages/[sessionId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import ChatSession from "@/lib/models/chatSession";
import verifyUser from "@/lib/backend/verifyUser";
import { Types } from "mongoose";
import { IMessage } from "@/types/schemaTypes";

export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const user = await verifyUser();

    // Get session ID from params
    const sessionId = req.nextUrl.searchParams.get("sessionId");

    // Validate sessionId
    if (!sessionId || !Types.ObjectId.isValid(sessionId)) {
      return NextResponse.json(
        { success: false, message: "Invalid session ID" },
        { status: 400 }
      );
    }

    // Get pagination parameters from query
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    // Connect to database
    await connectDB();

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

    console.log("[GET_CHAT_SESSION_MESSAGES]", {
      userId: user.userId,
      sessionId,
      page,
      limit,
    });

    // Get total count of messages
    const totalMessages = chatSession.messages.length;

    // Extract paginated messages
    const paginatedMessages = chatSession.messages
      .slice(skip, skip + limit)
      .map((message: IMessage) => ({
        content: message.content,
        role: message.role,
        timestamp: message.timestamp,
      }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalMessages / limit);
    const hasMore = page < totalPages;

    return NextResponse.json(
      {
        success: true,
        data: {
          messages: paginatedMessages,
          pagination: {
            page,
            limit,
            totalMessages,
            totalPages,
            hasMore,
          },
          sessionInfo: {
            title: chatSession.title,
            lastActivity: chatSession.lastActivity,
            isActive: chatSession.isActive,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET_CHAT_SESSION_MESSAGES_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
