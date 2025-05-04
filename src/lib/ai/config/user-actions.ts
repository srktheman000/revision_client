// // User actions that are used in custom components
// // Use this to define user-triggered actions that impact the conversation history

// // import { processMessages } from "@/lib/assistant";
// // import useConversationStore from "@/stores/useConversationStore";
// import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// // Adds the user action as context to the conversation history
// const addUserActionToContext = async (message: string) => {
//   const { addConversationItem } = useConversationStore.getState();

//   const conversationItem: ChatCompletionMessageParam = {
//     role: "user",
//     content: `[APP CONTEXT] ${message}`,
//   };

//   addConversationItem(conversationItem);
//   await processMessages();
// };

// export const selectSubject = async (subjectId: string) => {
//   const userMessage = `User selected subject ${subjectId}.`;
//   await addUserActionToContext(userMessage);
// };

// export const selectChapter = async (chapterId: string) => {
//   const userMessage = `User selected chapter ${chapterId}.`;
//   await addUserActionToContext(userMessage);
// };

// export const selectTopic = async (topicId: string) => {
//   const userMessage = `User selected topic ${topicId}.`;
//   await addUserActionToContext(userMessage);
// };

// export const submitQuizAnswer = async (questionId: string, answer: string) => {
//   const userMessage = `User answered question ${questionId} with: ${answer}`;
//   await addUserActionToContext(userMessage);
// };

// export const requestMoreInformation = async (conceptId: string) => {
//   const userMessage = `User requested more information about concept ${conceptId}.`;
//   await addUserActionToContext(userMessage);
// };

// export const flipFlashcard = async (cardId: string) => {
//   const userMessage = `User flipped flashcard ${cardId}.`;
//   await addUserActionToContext(userMessage);
// };
