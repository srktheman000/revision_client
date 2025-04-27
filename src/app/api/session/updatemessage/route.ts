// src/app/api/chat-session/messages/[sessionId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import ChatSession from "@/lib/models/chatSession";
import verifyUser from "@/lib/backend/verifyUser";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await verifyUser();

    // Parse request body
    const body = await req.json();
    const { content, role, sessionId } = body;

    if (!Types.ObjectId.isValid(sessionId)) {
      return NextResponse.json(
        { success: false, message: "Invalid session ID" },
        { status: 400 }
      );
    }

    console.log("[ADD_MESSAGE_TO_CHAT_SESSION]", {
      userId: user.userId,
      sessionId,
      content,
    });
    // Validate request body
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Message content is required and must be a string",
        },
        { status: 400 }
      );
    }

    if (!role || !["user", "assistant", "system"].includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid role (user, assistant, or system) is required",
        },
        { status: 400 }
      );
    }

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

    console.log("[ADD_MESSAGE_TO_CHAT_SESSION]", {
      userId: user.userId,
      sessionId,
      role,
    });

    // Create new message
    const newMessage = {
      content,
      role,
      timestamp: new Date(),
    };

    // Push the new message to the messages array
    chatSession.messages.push(newMessage);

    // Update the lastActivity field of the session
    chatSession.lastActivity = new Date();

    // Save the updated chat session
    await chatSession.save();

    // Get the newly added message with its generated ID
    const addedMessage = chatSession.messages[chatSession.messages.length - 1];

    return NextResponse.json(
      {
        success: true,
        data: {
          message: {
            id: addedMessage._id,
            content: addedMessage.content,
            role: addedMessage.role,
            timestamp: addedMessage.timestamp,
          },
        },
        message: "Message added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("[ADD_MESSAGE_TO_CHAT_SESSION_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
