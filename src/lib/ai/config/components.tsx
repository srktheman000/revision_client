"use client";
import React, { useState } from "react";

// Define interfaces for each component's props
interface SummaryCardProps {
  name: string;
  title: string;
  content: string;
  subject: string;
  chapter: string;
  keypoints?: string[];
}

interface TimelineProps {
  name: string;
  title: string;
  events: Array<{
    date: string;
    title: string;
    description: string;
    importance?: "low" | "medium" | "high";
  }>;
}

interface QuizProps {
  name: string;
  title: string;
  difficulty: string;
  questions: Array<{
    id: string;
    question: string;
    type: "multiple_choice" | "true_false" | "short_answer";
    options?: string[];
  }>;
}

interface ConceptMapProps {
  name: string;
  title: string;
  centralConcept: string;
  connections: Array<{
    from: string;
    to: string;
    relationship: string;
  }>;
}

interface FlashcardProps {
  name: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
}

interface HeaderProps {
  name: string;
  content: string;
}

interface TableProps {
  name: string;
  columns: Array<{
    key: string;
    title: string;
  }>;
  rows: Array<Record<string, any>>;
}

interface CardProps {
  name: string;
  children: Array<any>;
}

// Component implementations
export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  content,
  subject,
  chapter,
  keypoints,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-sm text-gray-500 mb-4">
        {subject} - {chapter}
      </div>
      <div className="prose mb-6">{content}</div>
      {keypoints && keypoints.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Key Points:</h3>
          <ul className="list-disc pl-5">
            {keypoints.map((point, i) => (
              <li key={i} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ title, events }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative border-l-2 border-blue-500 ml-4">
        {events?.map((event, index) => (
          <div key={index} className="mb-8 ml-6">
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] mt-1.5"></div>
            <div className="font-bold text-blue-700">{event?.date}</div>
            <h3 className="font-semibold text-lg">{event?.title}</h3>
            <p className="text-gray-700">{event?.description}</p>
            {event.importance && (
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  event?.importance === "high"
                    ? "bg-red-100 text-red-800"
                    : event?.importance === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {event?.importance.charAt(0).toUpperCase() +
                  event?.importance.slice(1)}{" "}
                Importance
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Quiz: React.FC<QuizProps> = ({ title, difficulty, questions }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  console.log("Quiz answers:", answers);
  console.log("Quiz submitted:", submitted);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = (questionId: string) => {
    setSubmitted({
      ...submitted,
      [questionId]: true,
    });
    // submitQuizAnswer(questionId, answers[questionId])
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-sm text-gray-500 mb-6">
        Difficulty: {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
      </div>

      {questions?.map((q, index) => (
        <div key={q.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-2">
            Question {index + 1}: {q.question}
          </h3>

          {q.type === "multiple_choice" && q.options && (
            <div className="ml-4 mt-3">
              {q.options.map((option, i) => (
                <div key={i} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      onChange={() => handleAnswerChange(q.id, option)}
                      disabled={submitted[q.id]}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}

          {q.type === "true_false" && (
            <div className="ml-4 mt-3">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name={q.id}
                  value="true"
                  onChange={() => handleAnswerChange(q.id, "true")}
                  disabled={submitted[q.id]}
                  className="mr-2"
                />
                True
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={q.id}
                  value="false"
                  onChange={() => handleAnswerChange(q.id, "false")}
                  disabled={submitted[q.id]}
                  className="mr-2"
                />
                False
              </label>
            </div>
          )}

          {q.type === "short_answer" && (
            <div className="ml-4 mt-3">
              <input
                type="text"
                placeholder="Your answer"
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={submitted[q.id]}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <button
            onClick={() => handleSubmit(q.id)}
            disabled={!answers[q.id] || submitted[q.id]}
            className={`mt-4 px-4 py-2 rounded ${
              submitted[q.id]
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {submitted[q.id] ? "Submitted" : "Submit Answer"}
          </button>

          {submitted[q.id] && (
            <div className="mt-3 p-3 bg-blue-50 rounded-md">
              <p className="font-medium">
                Answer submitted! The tutor will provide feedback shortly.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const ConceptMap: React.FC<ConceptMapProps> = ({
  title,
  centralConcept,
  connections,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="p-4 border-2 border-dashed border-blue-500 rounded-lg">
        <div className="text-center font-bold p-3 bg-blue-100 rounded-full mb-6">
          {centralConcept}
        </div>
        <div className="space-y-4">
          {connections?.map((connection, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded w-1/3 text-center">
                {connection?.from}
              </div>
              <div className="flex-1 text-center text-sm italic px-2">
                {connection?.relationship}
              </div>
              <div className="p-2 bg-yellow-100 rounded w-1/3 text-center">
                {connection?.to}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Flashcard: React.FC<FlashcardProps> = ({
  front,
  back,
  subject,
  topic,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  console.log("flipped", front, back, subject, topic);
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto my-4 cursor-pointer min-h-[200px] relative"
      onClick={handleFlip}
    >
      <div className="absolute top-2 right-2 text-xs text-gray-500">
        {subject} - {topic}
      </div>

      <div className="flex items-center justify-center h-full">
        {flipped ? (
          <div className="font-medium text-lg">{back}</div>
        ) : (
          <div className="font-bold text-xl">{front}</div>
        )}
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-gray-500">
        Click to {flipped ? "hide" : "show"} answer
      </div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ content }) => {
  return <h2 className="text-2xl font-bold mb-4">{content}</h2>;
};

export const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns?.map((column) => (
              <th
                key={column?.key}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column) => (
                <td key={column?.key} className="px-6 py-4 whitespace-nowrap">
                  {/* Use the column key to access the correct property from each row */}
                  {row[column?.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-4">
      {children &&
        Array.isArray(children) &&
        children.map((child, index) => {
          // Explicitly check for name and get the appropriate component
          if (!child || !child.name) return null;

          const ComponentMap: Record<string, React.ComponentType<any>> = {
            header: Header,
            summary_card: SummaryCard,
            timeline: Timeline,
            quiz: Quiz,
            concept_map: ConceptMap,
            flashcard: Flashcard,
            table: Table,
          };

          const ChildComponent = ComponentMap[child.name];
          return ChildComponent ? (
            <div key={index}>
              <ChildComponent {...child} />
            </div>
          ) : null;
        })}
    </div>
  );
};

// Export all components in a map that can be referenced by name
export const componentsMap: Record<string, React.ComponentType<any>> = {
  card: Card,
  header: Header,
  summary_card: SummaryCard,
  timeline: Timeline,
  quiz: Quiz,
  concept_map: ConceptMap,
  flashcard: Flashcard,
  table: Table,
};
