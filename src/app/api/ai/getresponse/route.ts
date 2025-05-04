import { MODEL } from "@/lib/ai/modal";
import { tools } from "@/lib/ai/tools/tools";
import verifyUser from "@/lib/backend/verifyUser";
import ChatSession from "@/lib/models/chatSession";
import OpenAI from "openai";
import { ChatCompletionTool } from "openai/resources/chat/completions";

const openai = new OpenAI();

export async function POST(request: Request) {
  const { sessionId } = await request.json();
  const user = await verifyUser();

  // Fetch the chat session for the user
  const session = await ChatSession.findOne({
    _id: sessionId,
    user: user.userId,
  });

  if (!session) {
    return new Response(JSON.stringify({ error: "Chat session not found" }), {
      status: 404,
    });
  }

  const messages = session.messages;
  console.log("Received messages:", messages);

  try {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log("Starting OpenAI stream", messages[messages.length - 1]);
          const openaiStream = openai.beta.chat.completions.stream({
            model: MODEL,
            messages,
            temperature: 0,
            tools: tools as ChatCompletionTool[],
            parallel_tool_calls: false,
          });

          console.log("OpenAI stream started", "openaiStream");

          let functionArguments = "";
          let callId = "";
          let functionName = "";
          let isCollectingFunctionArgs = false;

          for await (const part of openaiStream) {
            const delta = part.choices[0].delta;
            const finishReason = part.choices[0].finish_reason;

            if (delta.content) {
              const data = JSON.stringify({
                event: "assistant_delta",
                data: delta,
              });
              controller.enqueue(`data: ${data}\n\n`);
            }

            if (delta.tool_calls) {
              isCollectingFunctionArgs = true;
              if (delta.tool_calls[0].id) {
                callId = delta.tool_calls[0].id;
              }
              if (delta.tool_calls[0].function?.name) {
                functionName = delta.tool_calls[0].function.name;
                console.log("Function execution:", functionName);
              }
              functionArguments +=
                delta.tool_calls[0].function?.arguments || "";

              const data = JSON.stringify({
                event: "function_arguments_delta",
                data: {
                  callId: callId,
                  name: functionName,
                  arguments: delta.tool_calls[0].function?.arguments,
                },
              });
              controller.enqueue(`data: ${data}\n\n`);
            }

            if (finishReason === "tool_calls" && isCollectingFunctionArgs) {
              console.log(`tool call ${functionName} is complete`);
              const data = JSON.stringify({
                event: "function_arguments_done",
                data: {
                  callId: callId,
                  name: functionName,
                  arguments: functionArguments,
                },
              });
              controller.enqueue(`data: ${data}\n\n`);

              // Reset function arguments
              functionArguments = "";
              functionName = "";
              isCollectingFunctionArgs = false;
            }
          }

          controller.close();
        } catch (error) {
          console.error("Error in stream start:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.log("Error in POST handler:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
