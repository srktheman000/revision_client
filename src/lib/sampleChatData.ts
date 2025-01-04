const sampleChatData = [
  {
    id: "1",
    type: "text",
    content: "Hello! How can I assist you today?",
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "timeline",
    content: {
      events: [
        {
          year: "600 AD",
          title: "Early Chinese Bonsai",
          image: "/api/placeholder/100/80",
        },
        {
          year: "1192 AD",
          title: "Bonsai in Japan",
          image: "/api/placeholder/100/80",
        },
      ],
    },
    isUser: false,
  },
  {
    id: "3",
    type: "list",
    content: {
      items: [
        {
          title: "Ancient Murals",
          description:
            "A mural from the Tang Dynasty depicts a servant carrying a potted landscape.",
          image: "/api/placeholder/100/80",
        },
        {
          title: "Literary References",
          description:
            'Chinese literature includes references to "pun-sai", the practice of growing dwarf trees.',
          image: "/api/placeholder/100/80",
        },
      ],
    },
    isUser: false,
  },
  {
    id: "4",
    type: "quiz",
    content: {
      text: "What's the most common way jellyfish use bioluminescence?",
      options: ["Defense against predators", "Attracting mates"],
      correctAnswerId: "c",
    },
    isAnswered: false,
    isUser: false,
  },
  {
    id: "5",
    type: "summary",
    content: {
      title: "Project Milestone Summary",
      points: [
        {
          title: "Requirement Gathering",
          description:
            "Completed initial meetings with stakeholders to finalize project requirements.",
          isComplete: true,
        },
        {
          title: "Design Phase",
          description:
            "Currently working on UI/UX mockups and system architecture.",
          isComplete: false,
        },
        {
          title: "Development",
          description: "Development will start once designs are approved.",
        },
        {
          title: "Testing",
          description: "Testing phase to follow development completion.",
          isComplete: false,
        },
      ],
    },
    isUser: false,
  },
];

export default sampleChatData;
