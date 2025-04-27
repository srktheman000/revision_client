// src/app/api/chat-session/[subjectId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import ChatSession from "@/lib/models/chatSession";
import verifyUser from "@/lib/backend/verifyUser";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { subjectId: string } }
) {
  try {
    // Authenticate user
    const user = await verifyUser();

    // Get subject ID from params
    const { subjectId } = params;

    // Validate subjectId
    if (!Types.ObjectId.isValid(subjectId)) {
      return NextResponse.json(
        { success: false, message: "Invalid subject ID" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Build query
    const query = {
      user: user.userId,
      subject: subjectId,
    };

    console.log("[GET_CHAT_SESSIONS_BY_SUBJECT]", {
      userId: user.userId,
      subjectId,
    });

    // Fetch sessions with only required fields
    const sessions = await ChatSession.find(query, {
      _id: 1,
      title: 1,
      lastActivity: 1,
      isActive: 1,
    })
      .sort({ lastActivity: -1 })
      .lean();

    // Transform the data
    const transformedSessions = sessions.map((session) => ({
      sessionId: session._id,
      title: session.title,
      lastActivity: session.lastActivity,
      isActive: session.isActive,
    }));

    return NextResponse.json(
      {
        success: true,
        data: transformedSessions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET_CHAT_SESSIONS_BY_SUBJECT_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

// React Query usage example:
/*
import { useQuery } from '@tanstack/react-query';

const fetchSessionsBySubject = async (subjectId: string) => {
  const response = await fetch(`/api/chat-session/${subjectId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const YourComponent = ({ subjectId }: { subjectId: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sessions', subjectId],
    queryFn: () => fetchSessionsBySubject(subjectId)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.data.map((session) => (
        <div key={session.sessionId}>
          <h3>{session.title}</h3>
          <p>Last Activity: {new Date(session.lastActivity).toLocaleString()}</p>
          <p>Status: {session.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      ))}
    </div>
  );
};
*/
