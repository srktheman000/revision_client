"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";
import type { ChatMessageType, FunctionCall } from "./chatMessages";
import { ChatMessages } from "./chatMessages";
import { handleTurn } from "@/lib/ai/assistant";
import { parse } from "partial-json";

export function ChatSection() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [functionArguments, setFunctionArguments] = useState("");
  const [functionCall, setFunctionCall] = useState<FunctionCall | null>(null);
  const functionCallMessageIdRef = useRef<string | number | null>(null);
  const assistantMessageBuffer = useRef("");
  const assistantMessageIdRef = useRef<string | number | null>(null);
  const pageSize = 20;

  // Helper function to generate a unique ID
  const getRandomId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Fetch messages (infinite scroll)
  const fetchMessages = useCallback(
    async (pageNum: number) => {
      if (!sessionId) return;
      setIsLoading(true);
      try {
        const res = await apiClient.get(`/session/get`, {
          params: { sessionId, page: pageNum, pageSize },
        });
        const data = res.data;
        if (data.success && data.data && Array.isArray(data.data.messages)) {
          const mappedMessages = data.data.messages.map(
            (msg: ChatMessageType) => ({
              ...msg,
              messageType: msg.messageType || "text",
            })
          );
          if (pageNum === 1) {
            setMessages(mappedMessages.reverse()); // latest at bottom
          } else {
            setMessages((prev) => [...mappedMessages.reverse(), ...prev]);
          }
          setHasMore(data.data.pagination?.hasMore === true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  useEffect(() => {
    if (!sessionId) return;
    setPage(1);
    fetchMessages(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Load more messages (older)
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMessages(nextPage);
  }, [isLoading, hasMore, page, fetchMessages]);

  // Add or update message in the chat
  const addMessage = useCallback((message: ChatMessageType) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const updateMessage = useCallback(
    (id: string | number, updates: Partial<ChatMessageType>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
      );
    },
    []
  );

  // Send new message
  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    // Finalize any previous assistant message
    if (assistantMessageIdRef.current) {
      updateMessage(assistantMessageIdRef.current, {
        isLoadingMessage: false,
        content: assistantMessageBuffer.current,
        messageType: "text",
      });
      assistantMessageBuffer.current = "";
      assistantMessageIdRef.current = null;
    }

    // Create and add user message
    const newMsg: ChatMessageType = {
      id: getRandomId(),
      role: "user",
      content: input,
      messageType: "text",
    };

    addMessage(newMsg);
    setInput("");
    setFunctionArguments("");
    functionCallMessageIdRef.current = null;
    setFunctionCall(null);

    try {
      // Send message to API
      await apiClient.post("/session/updatemessage", {
        sessionId,
        role: "user",
        content: input,
      });

      // Process the AI response
      await handleTurn(sessionId, async ({ event, data }) => {
        console.log(`Event: ${event}`, data);

        switch (event) {
          case "assistant_delta":
            handleAssistantDelta(data);
            break;

          case "function_arguments_delta":
            handleFunctionArgumentsDelta(data);
            break;

          case "function_arguments_done":
            handleFunctionArgumentsDone(data);
            break;

          case "function_call":
            handleFunctionCall(data);
            break;

          default:
            console.log(`Unhandled event type: ${event}`);
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        id: getRandomId(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
        messageType: "error",
      });
    }
  };

  // Handle initial function call event
  const handleFunctionCall = (data: { name: string }) => {
    // Clear any existing assistant message
    if (assistantMessageIdRef.current) {
      updateMessage(assistantMessageIdRef.current, {
        isLoadingMessage: false,
        content: assistantMessageBuffer.current,
      });
      assistantMessageBuffer.current = "";
      assistantMessageIdRef.current = null;
    }

    // Set the current function call (with all required properties)
    setFunctionCall({
      type: "function_call",
      status: "in_progress",
      id: getRandomId(),
      name: data.name,
      arguments: "",
      parsedArguments: null,
      output: null,
    });

    // Create a placeholder message for the function
    const id = getRandomId();
    functionCallMessageIdRef.current = id;

    if (data.name === "generate_ui") {
      addMessage({
        id,
        role: "assistant",
        content: {},
        messageType: "generate_ui",
        isLoadingMessage: true,
      });
    } else {
      // For other function types, just use a text messageType
      addMessage({
        id,
        role: "assistant",
        content: `Calling function: ${data.name}...`,
        messageType: "text",
        isLoadingMessage: true,
      });
    }
  };

  // Handle streaming assistant text
  const handleAssistantDelta = (data: { content?: string }) => {
    const content = data.content || "";

    // If a function call is in progress, finalize it before starting a new assistant message
    if (functionCallMessageIdRef.current) {
      updateMessage(functionCallMessageIdRef.current, {
        isLoadingMessage: false,
      });
      functionCallMessageIdRef.current = null;
      setFunctionArguments("");
      setFunctionCall(null);
    }

    if (!assistantMessageIdRef.current) {
      // Create new assistant message
      const id = getRandomId();
      assistantMessageIdRef.current = id;
      assistantMessageBuffer.current = content;

      addMessage({
        id,
        role: "assistant",
        content: content,
        isLoadingMessage: true,
        messageType: "text",
      });
    } else {
      // Update existing message
      assistantMessageBuffer.current += content;
      updateMessage(assistantMessageIdRef.current, {
        content: assistantMessageBuffer.current,
        messageType: "text",
      });
    }
  };

  // Handle streaming function arguments
  const handleFunctionArgumentsDelta = (data: {
    arguments?: string;
    name: string;
  }) => {
    const argumentsChunk = data.arguments || "";

    // Accumulate arguments
    const updatedArguments = functionArguments + argumentsChunk;
    setFunctionArguments(updatedArguments);

    // If functionCallMessageIdRef is not set, create a new message
    if (!functionCallMessageIdRef.current) {
      const id = getRandomId();
      functionCallMessageIdRef.current = id;
      addMessage({
        id,
        role: "assistant",
        content: {},
        messageType: "generate_ui",
        isLoadingMessage: true,
      });
    }

    // Try to parse the accumulated arguments, but always update the message
    let parsedJson = null;
    try {
      parsedJson = parse(updatedArguments);
    } catch (error) {
      // Partial JSON, ignore error
    }
    // Always update message: if parsed, use it; else, pass the raw string for loading effect
    updateMessage(functionCallMessageIdRef.current, {
      content: parsedJson
        ? parsedJson.component
          ? parsedJson
          : { component: parsedJson }
        : { __raw: updatedArguments },
      isLoadingMessage: true,
      messageType: "generate_ui",
    });
  };

  const handleFunctionArgumentsDone = (data: {
    arguments?: string;
    name: string;
  }) => {
    if (!functionCallMessageIdRef.current) return;

    try {
      const parsedArguments = parse(data.arguments || "");

      // Update message with parsed component content
      updateMessage(functionCallMessageIdRef.current, {
        content: parsedArguments,
        isLoadingMessage: false,
        messageType: "generate_ui",
      });
    } catch (error) {
      console.log("Failed to parse function arguments at done stage:", error);

      setFunctionCall((prev) =>
        prev
          ? {
              ...prev,
              status: "error",
              output: "Error parsing function arguments.",
            }
          : null
      );

      updateMessage(functionCallMessageIdRef.current, {
        content: "Error rendering function output.",
        isLoadingMessage: false,
        messageType: "error",
      });
    }

    setFunctionArguments("");
    functionCallMessageIdRef.current = null;
  };
  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        <ChatMessages
          messages={messages}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 bg-background flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask your assistant..."
          rows={1}
          className="flex-1 resize-none"
          autoFocus
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
