import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Message {
  id: string;
  content: string;
  role: string;
  timestamp: Date;
}

interface PaginatedResponse {
  success: boolean;
  data: {
    messages: Message[];
    pagination: {
      page: number;
      limit: number;
      totalMessages: number;
      totalPages: number;
      hasMore: boolean;
    };
    sessionInfo: {
      title: string;
      lastActivity: Date;
      isActive: boolean;
    };
  };
}

const fetchSessionMessages = async ({
  sessionId,
  pageParam = 1,
}: {
  sessionId: string;
  pageParam?: number;
}): Promise<PaginatedResponse> => {
  const response = await fetch(
    `/api/chat-session/messages/${sessionId}?page=${pageParam}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ChatMessagesComponent = ({ sessionId }: { sessionId: string }) => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["sessionMessages", sessionId],
    queryFn: ({ pageParam }) => fetchSessionMessages({ sessionId, pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasMore) {
        return lastPage.data.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  // Flatten all messages from all pages
  const allMessages = data.pages.flatMap((page) => page.data.messages);

  // Get session info from the first page
  const sessionInfo = data.pages[0].data.sessionInfo;

  return (
    <div>
      <h2>{sessionInfo.title}</h2>
      <div className="messages-container">
        {allMessages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        <div ref={ref}>{isFetchingNextPage && <div>Loading more...</div>}</div>
      </div>
    </div>
  );
};
