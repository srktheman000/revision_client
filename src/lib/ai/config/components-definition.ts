// List of components that will be used by the generate_ui tool
// Define recursive components using the $ref property

export const components = [
  {
    name: "card",
    parameters: {
      children: {
        type: "array",
        items: { $ref: "#/$defs/component" },
      },
    },
  },
  {
    name: "header",
    parameters: {
      content: {
        type: "string",
        description: "The text content.",
      },
    },
  },
  {
    name: "summary_card",
    parameters: {
      title: {
        type: "string",
        description: "Title of the summary",
      },
      content: {
        type: "string",
        description: "Summary content text",
      },
      subject: {
        type: "string",
        description: "Subject the summary belongs to",
      },
      chapter: {
        type: "string",
        description: "Chapter the summary belongs to",
      },
      keypoints: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Key points to remember from the summary",
      },
    },
  },
  {
    name: "quiz",
    parameters: {
      title: {
        type: "string",
        description: "Title of the quiz",
      },
      difficulty: {
        type: "string",
        description: "Difficulty level of the quiz",
      },
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Question ID",
            },
            question: {
              type: "string",
              description: "The question text",
            },
            options: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Multiple choice options (if applicable)",
            },
            type: {
              type: "string",
              enum: ["multiple_choice", "true_false", "short_answer"],
              description: "Type of question",
            },
          },
          required: ["id", "question", "type", "options"],
          additionalProperties: false,
        },
      },
    },
  },
  {
    name: "concept_map",
    parameters: {
      title: {
        type: "string",
        description: "Title of the concept map",
      },
      centralConcept: {
        type: "string",
        description: "The main concept being mapped",
      },
      connections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            from: {
              type: "string",
              description: "Source concept",
            },
            to: {
              type: "string",
              description: "Target concept",
            },
            relationship: {
              type: "string",
              description: "Description of the relationship between concepts",
            },
          },
          required: ["from", "to", "relationship"],
          additionalProperties: false,
        },
      },
    },
  },
  {
    name: "table",
    parameters: {
      columns: {
        type: "array",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Key for the column",
            },
            title: {
              type: "string",
              description: "Title for the column",
            },
          },
          required: ["key", "title"],
          additionalProperties: false,
        },
      },
      rows: {
        type: "array",
        items: {
          type: "object",
          properties: {
            col1: { type: "string", description: "Value for column 1" },
            col2: { type: "string", description: "Value for column 2" },
            col3: { type: "string", description: "Value for column 3" },
          },
          additionalProperties: false,
          required: ["col1", "col2", "col3"],
        },
      },
    },
  },
  {
    name: "flashcard",
    parameters: {
      front: {
        type: "string",
        description: "Content for the front of the flashcard",
      },
      back: {
        type: "string",
        description: "Content for the back of the flashcard",
      },
      subject: {
        type: "string",
        description: "Subject the flashcard belongs to",
      },
      topic: {
        type: "string",
        description: "Topic the flashcard belongs to",
      },
    },
  },
  {
    name: "flashcard_set",
    parameters: {
      title: {
        type: "string",
        description: "Title of the flashcard set",
      },
      cards: {
        type: "array",
        items: {
          $ref: "#/$defs/flashcard",
        },
      },
    },
  },
  {
    name: "timeline",
    parameters: {
      title: {
        type: "string",
        description: "Title of the timeline",
      },
      events: {
        type: "array",
        items: {
          type: "object",
          properties: {
            date: {
              type: "string",
              description: "Date or year of the event",
            },
            title: {
              type: "string",
              description: "Title of the event",
            },
            description: {
              type: "string",
              description: "Description of the event",
            },
            importance: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Importance level of the event",
            },
          },
          required: ["date", "title", "description", "importance"],
          additionalProperties: false,
        },
      },
    },
  },
];
