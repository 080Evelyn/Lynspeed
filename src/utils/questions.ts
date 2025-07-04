type Question = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    next: string;
  }[];
};

export const questions: Record<string, Question> = {
  q1: {
    id: "q1",
    step: "STEP 1/2",
    title: "What Excites You",
    subtitle:
      "If money wasn’t a problem, what would you wake up excited to do every day?",
    options: [
      {
        id: "design",
        label: "🎨 Create or design things (art, music, fashion, etc.)",
        next: "q2a",
      },
      {
        id: "solve",
        label:
          "🧪 Solve problems and explore how things work (science, engineering)",
        next: "q2b",
      },
      {
        id: "help",
        label: "👨‍⚕ Help people feel better (healthcare, counseling, etc.)",
        next: "q2c",
      },
      {
        id: "finance",
        label: "🧮 Work with numbers, plans, or finances",
        next: "q2d",
      },
      {
        id: "communicate",
        label: "💬 Talk, teach, or share ideas (law, media, education)",
        next: "q2e",
      },
      {
        id: "manage",
        label: "🌍 Start and manage businesses or projects",
        next: "q2f",
      },
      {
        id: "work",
        label: "  🧑‍🌾 Work with hands or nature",
        next: "q2g",
      },
    ],
  },

  q2a: {
    id: "q2a",
    step: "STEP 2/2",
    title: "You Love to Create!",
    subtitle: "Do you prefer working alone or in a group when creating?",
    options: [
      {
        id: "alone",
        label:
          "Alone → 🎧 Independent artist, writer, illustrator, UI/UX designer",
        next: "",
      },
      {
        id: "group",
        label:
          "Group → 🎬 Film director, advertising creative, animator, game designer",
        next: "",
      },
    ],
  },

  q2b: {
    id: "q2b",
    step: "STEP 2/2",
    title: "You Love to Solve and Discover",
    subtitle:
      "Do you enjoy more of practical hands-on problem solving or deep theoretical thinking?",
    options: [
      {
        id: "hands-on",
        label: "Hands-on → 🧑‍🔬 Engineer, lab technician, IT technician",
        next: "",
      },
      {
        id: "theoretical",
        label: "Theoretical → 🧠 Scientist, researcher, data analyst",
        next: "",
      },
    ],
  },

  q2c: {
    id: "q2c",
    step: "STEP 2/2",
    title: "You Want to Help People Feel Better",
    subtitle:
      "Are you more drawn to treating people physically or emotionally?",
    options: [
      {
        id: "physically",
        label: "Physically → 🩺 Doctor, nurse, physiotherapist, dentist",
        next: "",
      },
      {
        id: "emotionally",
        label: "Emotionally → 🧠 Psychologist, counselor, social worker",
        next: "",
      },
    ],
  },

  q2d: {
    id: "q2d",
    step: "STEP 2/2",
    title: " You Love Numbers, Logic, and Planning",
    subtitle:
      "Do you prefer analyzing data, managing money, or organizing resources?",
    options: [
      {
        id: "analyzing",
        label:
          "Analyzing data → 📊 Statistician, data analyst, financial analyst",
        next: "",
      },
      {
        id: "managing",
        label: "Managing money → 💵 Accountant, banker, investment advisor",
        next: "",
      },
    ],
  },
  q2e: {
    id: "q2e",
    step: "STEP 2/2",
    title: "You Like to Communicate, Teach, or Persuade",
    subtitle: "Do you enjoy speaking in front of people or writing more?",
    options: [
      {
        id: "speaking",
        label:
          "Speaking → 🧑‍🏫 Teacher, motivational speaker, lawyer, politician",
        next: "",
      },
      {
        id: "writing",
        label: "Writing → ✍ Journalist, author, copywriter, scriptwriter",
        next: "",
      },
    ],
  },
  q2f: {
    id: "q2f",
    step: "STEP 2/2",
    title: "You Want to Start or Manage Projects",
    subtitle:
      "Do you prefer leading others or coming up with ideas and letting someone else run it?",
    options: [
      {
        id: "lead",
        label: "Lead → Manager, entrepreneur, team leader",
        next: "",
      },
      {
        id: "theoretical",
        label: "Idea person → Innovator, product developer, consultant",
        next: "",
      },
    ],
  },
  q2g: {
    id: "q2g",
    step: "STEP 2/2",
    title: " You Enjoy Working with Hands, Nature, or Tools",
    subtitle:
      "Do you prefer working outdoors or building things with your hands?",
    options: [
      {
        id: "outdoors",
        label:
          "Outdoors → Farmer, agricultural scientist, environmentalist, geologist",
        next: "",
      },
      {
        id: "indoors",
        label: "Hands-on indoors → Electrician, mechanic, carpenter, chef",
        next: "",
      },
    ],
  },
  // Add q2b, q2c, etc. here...
};

type QuestionQuiz = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    next: string;
  }[];
};

export const questionsQuiz: Record<string, QuestionQuiz> = {
  q1: {
    id: "q1",
    step: "STEP 1/2",
    title: "What Excites You",
    subtitle:
      "If money wasn’t a problem, what would you wake up excited to do every day?",
    options: [
      {
        id: "design",
        label: "🎨 Create or design things (art, music, fashion, etc.)",
        next: "q2a",
      },
      {
        id: "solve",
        label:
          "🧪 Solve problems and explore how things work (science, engineering)",
        next: "q2b",
      },
      {
        id: "help",
        label: "👨‍⚕ Help people feel better (healthcare, counseling, etc.)",
        next: "q2c",
      },
      {
        id: "finance",
        label: "🧮 Work with numbers, plans, or finances",
        next: "q2d",
      },
      {
        id: "communicate",
        label: "💬 Talk, teach, or share ideas (law, media, education)",
        next: "q2e",
      },
      {
        id: "manage",
        label: "🌍 Start and manage businesses or projects",
        next: "q2f",
      },
      {
        id: "work",
        label: "  🧑‍🌾 Work with hands or nature",
        next: "q2g",
      },
    ],
  },

  q2a: {
    id: "q2a",
    step: "STEP 2/2",
    title: "You Love to Create!",
    subtitle: "Do you prefer working alone or in a group when creating?",
    options: [
      {
        id: "alone",
        label:
          "Alone → 🎧 Independent artist, writer, illustrator, UI/UX designer",
        next: "",
      },
      {
        id: "group",
        label:
          "Group → 🎬 Film director, advertising creative, animator, game designer",
        next: "",
      },
    ],
  },

  q2b: {
    id: "q2b",
    step: "STEP 2/2",
    title: "You Love to Solve and Discover",
    subtitle:
      "Do you enjoy more of practical hands-on problem solving or deep theoretical thinking?",
    options: [
      {
        id: "hands-on",
        label: "Hands-on → 🧑‍🔬 Engineer, lab technician, IT technician",
        next: "",
      },
      {
        id: "theoretical",
        label: "Theoretical → 🧠 Scientist, researcher, data analyst",
        next: "",
      },
    ],
  },

  q2c: {
    id: "q2c",
    step: "STEP 2/2",
    title: "You Want to Help People Feel Better",
    subtitle:
      "Are you more drawn to treating people physically or emotionally?",
    options: [
      {
        id: "physically",
        label: "Physically → 🩺 Doctor, nurse, physiotherapist, dentist",
        next: "",
      },
      {
        id: "emotionally",
        label: "Emotionally → 🧠 Psychologist, counselor, social worker",
        next: "",
      },
    ],
  },

  q2d: {
    id: "q2d",
    step: "STEP 2/2",
    title: " You Love Numbers, Logic, and Planning",
    subtitle:
      "Do you prefer analyzing data, managing money, or organizing resources?",
    options: [
      {
        id: "analyzing",
        label:
          "Analyzing data → 📊 Statistician, data analyst, financial analyst",
        next: "",
      },
      {
        id: "managing",
        label: "Managing money → 💵 Accountant, banker, investment advisor",
        next: "",
      },
    ],
  },
  q2e: {
    id: "q2e",
    step: "STEP 2/2",
    title: "You Like to Communicate, Teach, or Persuade",
    subtitle: "Do you enjoy speaking in front of people or writing more?",
    options: [
      {
        id: "speaking",
        label:
          "Speaking → 🧑‍🏫 Teacher, motivational speaker, lawyer, politician",
        next: "",
      },
      {
        id: "writing",
        label: "Writing → ✍ Journalist, author, copywriter, scriptwriter",
        next: "",
      },
    ],
  },
  q2f: {
    id: "q2f",
    step: "STEP 2/2",
    title: "You Want to Start or Manage Projects",
    subtitle:
      "Do you prefer leading others or coming up with ideas and letting someone else run it?",
    options: [
      {
        id: "lead",
        label: "Lead → Manager, entrepreneur, team leader",
        next: "",
      },
      {
        id: "theoretical",
        label: "Idea person → Innovator, product developer, consultant",
        next: "",
      },
    ],
  },
  q2g: {
    id: "q2g",
    step: "STEP 2/2",
    title: " You Enjoy Working with Hands, Nature, or Tools",
    subtitle:
      "Do you prefer working outdoors or building things with your hands?",
    options: [
      {
        id: "outdoors",
        label:
          "Outdoors → Farmer, agricultural scientist, environmentalist, geologist",
        next: "",
      },
      {
        id: "indoors",
        label: "Hands-on indoors → Electrician, mechanic, carpenter, chef",
        next: "",
      },
    ],
  },
  // Add q2b, q2c, etc. here...
};
