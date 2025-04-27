// /app/chat/[subjectid]/components/Sidebar.tsx
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils"; // If you don't have cn, I can show you how to write it
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; // From shadcn
import { Menu, X, ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import SessionBar from "./SessionBar";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SessionItem {
  sessionId: string;
  title: string;
  lastActivity: string;
  isActive: boolean;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = params.subjectId as string;
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to update the session query param
  const updateSessionQuery = useCallback(
    (sessionId: string) => {
      console.log("Updating session query param:", sessionId);
      const url = new URL(window.location.href);
      url.searchParams.set("session", sessionId);
      router.replace(url.pathname + url.search);
    },
    [router]
  );

  // Fetch or create session on mount
  useEffect(() => {
    if (!subjectId) return;
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get(`/session/${subjectId}`);
        const data = res.data;
        if (data.success && data.data.length > 0) {
          setSessions(data.data);
          // If no session param, set it to the first session
          const currentSession = searchParams.get("session");
          if (!currentSession && data.data[0]?.sessionId) {
            updateSessionQuery(data.data[0].sessionId);
          }
        } else {
          // No sessions found, create a new one
          const createRes = await apiClient.post(`/session/create`, {
            subjectId,
            title: `Session ${Math.random().toString(36).substring(7)}`,
          });
          const createData = createRes.data;
          if (createData.success && createData.data) {
            setSessions([
              {
                sessionId: createData.data._id,
                title: createData.data.title,
                lastActivity: createData.data.lastActivity,
                isActive: createData.data.isActive,
              },
            ]);
            updateSessionQuery(createData.data._id);
          } else {
            setError(createData.message || "Failed to create session");
          }
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch sessions"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  // Handler for New Chat
  const handleNewChat = async () => {
    if (!subjectId) return;
    setLoading(true);
    setError(null);
    try {
      const createRes = await apiClient.post(`/session/create`, {
        subjectId,
        title: `Session ${Math.random().toString(36).substring(7)}`,
      });
      const createData = createRes.data;
      if (createData.success && createData.data) {
        const newSession = {
          sessionId: createData.data._id,
          title: createData.data.title,
          lastActivity: createData.data.lastActivity,
          isActive: createData.data.isActive,
        };
        setSessions((prev) => [newSession, ...prev]);
        updateSessionQuery(createData.data._id);
      } else {
        setError(createData.message || "Failed to create session");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  // Handler for deleting a session
  const handleDeleteSession = useCallback(
    async (sessionId: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.delete(
          `/session/delete?sessionId=${sessionId}`
        );
        const data = res.data;
        if (data.success) {
          setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
          // If the deleted session is the current one, update the query param
          const currentSession = searchParams.get("session");
          if (currentSession === sessionId) {
            const remainingSessions = sessions.filter(
              (s) => s.sessionId !== sessionId
            );
            if (remainingSessions.length > 0) {
              updateSessionQuery(remainingSessions[0].sessionId);
            } else {
              // No sessions left, remove query param
              const url = new URL(window.location.href);
              url.searchParams.delete("session");
              router.replace(url.pathname + url.search);
            }
          }
        } else {
          setError(data.message || "Failed to delete session");
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to delete session"
        );
      } finally {
        setLoading(false);
      }
    },
    [router, searchParams, sessions, updateSessionQuery]
  );

  // Memoized handlers for SessionBar
  const handleSessionClick = useCallback(
    (sessionId: string) => () => {
      updateSessionQuery(sessionId);
    },
    [updateSessionQuery]
  );

  const handleSessionDelete = useCallback(
    (sessionId: string) => () => {
      handleDeleteSession(sessionId);
    },
    [handleDeleteSession]
  );

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-black p-4 transition-transform transform md:relative md:translate-x-0 md:flex md:flex-col",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        }
      )}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Back button to go to previous page ("/home") */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/home")}
          className="mr-2"
        >
          <span className="sr-only">Back</span>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        {/* Sidebar toggle button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <Button variant="outline" className="w-full my-4" onClick={handleNewChat}>
        + New Chat
      </Button>
      <ScrollArea className="flex-1 bg-red  h-full">
        {loading && <div className="p-2 text-muted-foreground">Loading...</div>}
        {error && <div className="p-2 text-red-500">{error}</div>}
        {!loading &&
          !error &&
          sessions.map((session) => (
            <SessionBar
              key={session.sessionId}
              session={session}
              onClick={handleSessionClick(session.sessionId)}
              onDelete={handleSessionDelete(session.sessionId)}
            />
          ))}
        <div className="h-4" /> {/* For spacing */}
      </ScrollArea>
    </div>
  );
}
