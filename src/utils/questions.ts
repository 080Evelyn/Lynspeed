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
        label: "🎨 Create or design things",
        next: "q2a",
      },
      {
        id: "solve",
        label: "🧪 Solve problems and explore how things work",
        next: "q2b",
      },
      {
        id: "help",
        label: "👨‍⚕ Help people feel better",
        next: "q2c",
      },
      {
        id: "finance",
        label: "🧮 Work with numbers, plans, or finances",
        next: "q2d",
      },
      {
        id: "communicate",
        label: "💬 Talk, teach, or share ideas",
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
        label: "🎧Alone ",
        next: "",
      },
      {
        id: "group",
        label: "🎬Group",
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
        label: "🧑‍🔬Hands-on",
        next: "",
      },
      {
        id: "theoretical",
        label: "🧠Theoretical",
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
        label: "🩺Physically",
        next: "",
      },
      {
        id: "emotionally",
        label: "🧠Emotionally",
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
        label: "📊Analyzing data",
        next: "",
      },
      {
        id: "managing",
        label: "💵Managing money",
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
        label: "🧑‍🏫Speaking",
        next: "",
      },
      {
        id: "writing",
        label: "✍Writing",
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
        label: "Lead",
        next: "",
      },
      {
        id: "theoretical",
        label: "Idea person",
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
        label: "Outdoors",
        next: "",
      },
      {
        id: "indoors",
        label: "Hands-on indoors",
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
    step: "STEP 1/3",
    title: "What Excites You?",
    subtitle:
      "If money wasn’t a problem, what would you wake up excited to do every day?",
    options: [
      {
        id: "design",
        label: "🎨 Create or design things ",
        next: "q2a",
      },
      {
        id: "solve",
        label: "🧪 Solve problems and explore how things work",
        next: "q2b",
      },
      {
        id: "help",
        label: "👨‍⚕ Help people feel better",
        next: "q2c",
      },
      {
        id: "finance",
        label: "🧮 Work with numbers, plans, or finances",
        next: "q2d",
      },
      {
        id: "communicate",
        label: "💬 Talk, teach, or share ideas",
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
      {
        id: "Entertainment",
        label: " 🎧 Entertainment & Performance ",
        next: "q2h",
      },
      {
        id: "Exploring",
        label: " ✈️ Exploring Cultures & Travel  ",
        next: "q2i",
      },
    ],
  },

  q2a: {
    id: "q2a",
    step: "STEP 2/3",
    title: "You Love to Create!",
    subtitle: "Do you prefer working alone or in a group when creating?",
    options: [
      {
        id: "alone",
        label: "Alone → 🎧",
        next: "q3a",
      },
      {
        id: "group",
        label: "Group → 🎬",
        next: "q3b",
      },
    ],
  },

  q2b: {
    id: "q2b",
    step: "STEP 2/3",
    title: "You Love to Solve and Discover",
    subtitle:
      "Do you enjoy more of practical hands-on problem solving or deep theoretical thinking?",
    options: [
      {
        id: "hands-on",
        label: "Hands-on → 🧑‍🔬 ",
        next: "q3c",
      },
      {
        id: "theoretical",
        label: "Deep thinking & logic  → 🧠",
        next: "q3d",
      },
      {
        id: "Blend of both ",
        label: "Blend of both  → ",
        next: "q3e",
      },
    ],
  },

  q2c: {
    id: "q2c",
    step: "STEP 2/3",
    title: "You Want to Help People Feel Better",
    subtitle:
      "Are you more drawn to treating people physically or emotionally?",
    options: [
      {
        id: "physically",
        label: "Physical care  → 🩺",
        next: "q3f",
      },
      {
        id: "emotionally",
        label: " Emotional & mental care  → 🧠",
        next: "q3g",
      },
      {
        id: "outreach ",
        label: " Community & outreach   → 🧠",
        next: "q3h",
      },
    ],
  },

  q2d: {
    id: "q2d",
    step: "STEP 2/3",
    title: " You Love Numbers, Logic, and Planning",
    subtitle: "What interests you most?",
    options: [
      {
        id: "analyzing",
        label: "Money & finance → 📊",
        next: "q3i",
      },
      {
        id: "managing",
        label: "Data & patterns → 💵",
        next: "q3j",
      },
      {
        id: "Logistics",
        label: "Logistics & planning → 💵",
        next: "q3k",
      },
    ],
  },
  q2e: {
    id: "q2e",
    step: "STEP 2/3",
    title: "You Like to Communicate, Teach, or Persuade",
    subtitle: "Do you enjoy speaking in front of people or writing more?",
    options: [
      {
        id: "speaking",
        label: "Speaking → 🧑‍🏫",
        next: "q3l",
      },
      {
        id: "writing",
        label: "Writing → ✍ ",
        next: "q3m",
      },
    ],
  },
  q2f: {
    id: "q2f",
    step: "STEP 2/3",
    title: "You Want to Start or Manage Projects",
    subtitle:
      "Do you prefer leading others or coming up with ideas and letting someone else run it?",
    options: [
      {
        id: "lead",
        label: "A leader and organizer  → ",
        next: "q3n",
      },
      {
        id: "theoretical",
        label: "Idea person →",
        next: "q3o",
      },
    ],
  },
  q2g: {
    id: "q2g",
    step: "STEP 2/3",
    title: "🎧 Entertainment & Performance  ",
    subtitle: " Entertainment ",
    options: [
      {
        id: "Crafts",
        label: "Crafts & tools  → ",
        next: "q3p",
      },
      {
        id: "Cooking",
        label: "Cooking & food  → ",
        next: "q3q",
      },
      {
        id: "Outdoors",
        label: "Outdoors/nature  → ",
        next: "q3r",
      },
    ],
  },
  q2h: {
    id: "q2h",
    step: "STEP 2/3",
    title: " Entertainment & Performance  ",
    subtitle: "Entertainment",
    options: [
      {
        id: "Music",
        label: "Music  → ",
        next: "q3s",
      },
      {
        id: "Content",
        label: "Content Creation  → ",
        next: "q3t",
      },
      {
        id: "Stage",
        label: "Stage  → ",
        next: "q3u",
      },
    ],
  },
  q2i: {
    id: "q2i",
    step: "STEP 2/3",
    title: " Exploring Cultures & Travel   ",
    subtitle: "Cultures & Travel ",
    options: [
      {
        id: "Realworld Guide",
        label: "Realworld Guide  → ",
        next: "q3v",
      },
      {
        id: "Cultural Study",
        label: "Cultural Study → ",
        next: "q3w",
      },
      {
        id: "Content",
        label: "Content + Culture  → ",
        next: "q3x",
      },
    ],
  },
  q3a: {
    id: "q3a",
    step: "STEP 3/3",
    title: " Solo Creators",
    subtitle: "Careers",
    options: [
      {
        id: "Writer",
        label: "Writer",
        next: "",
      },
      {
        id: "Illustrator",
        label: "Illustrator",
        next: "",
      },
      {
        id: "UI/UX Designer",
        label: "UI/UX Designer",
        next: "",
      },
      {
        id: "Photographer",
        label: "Photographer",
        next: "",
      },
      {
        id: "  Indie Game Developer",
        label: "  Indie Game Developer",
        next: "",
      },
    ],
  },

  q3b: {
    id: "q3b",
    step: "STEP 3/3",
    title: " Team Creators",
    subtitle: "Careers",
    options: [
      {
        id: "Animator",
        label: "Animator",
        next: "",
      },
      {
        id: "Brand Designer",
        label: "Brand Designer",
        next: "",
      },
      {
        id: "Fashion Director",
        label: "Fashion Director",
        next: "",
      },
      {
        id: "Game Designer",
        label: "Game Designer",
        next: "",
      },
    ],
  },

  q3c: {
    id: "q3c",
    step: "STEP 3/3",
    title: " Builders",
    subtitle: "Careers",
    options: [
      {
        id: "Engineer",
        label: "Engineer",
        next: "",
      },
      {
        id: "Technician",
        label: "Technician",
        next: "",
      },
      {
        id: "Electrician",
        label: "Electrician",
        next: "",
      },
      {
        id: "Mechanic",
        label: "Mechanic",
        next: "",
      },
    ],
  },
  q3d: {
    id: "q3d",
    step: "STEP 3/3",
    title: " Thinkers",
    subtitle: "Careers",
    options: [
      {
        id: "Data Analyst",
        label: "Data Analyst",
        next: "",
      },
      {
        id: "Software Developer",
        label: "Software Developer",
        next: "",
      },
      {
        id: "Scientist",
        label: "Scientist",
        next: "",
      },
      {
        id: "Mathematician",
        label: "Mathematician",
        next: "",
      },
    ],
  },
  q3e: {
    id: "q3e",
    step: "STEP 3/3",
    title: "Hands + Mind ",
    subtitle: "Careers",
    options: [
      {
        id: "Civil Engineer",
        label: "Civil Engineer",
        next: "",
      },
      {
        id: "AgriTech Specialist",
        label: "AgriTech Specialist",
        next: "",
      },
      {
        id: "Medical Technologist",
        label: "Medical Technologist",
        next: "",
      },
    ],
  },
  q3f: {
    id: "q3f",
    step: "STEP 3/3",
    title: "Physical Healthcare",
    subtitle: "Careers",
    options: [
      {
        id: "Doctor",
        label: "Doctor",
        next: "",
      },
      {
        id: "Nurse",
        label: "Nurse",
        next: "",
      },
      {
        id: "Radiographer",
        label: "Radiographer",
        next: "",
      },
      {
        id: "Physiotherapist",
        label: "Physiotherapist",
        next: "",
      },
    ],
  },
  q3g: {
    id: "q3g",
    step: "STEP 3/3",
    title: " Mental Health",
    subtitle: "Careers",
    options: [
      {
        id: "Counselor",
        label: "Counselor",
        next: "",
      },
      {
        id: "Therapist",
        label: "Therapist",
        next: "",
      },
      {
        id: "Life Coach",
        label: "Life Coach",
        next: "",
      },
    ],
  },
  q3h: {
    id: "q3h",
    step: "STEP 3/3",
    title: " Community Work",
    subtitle: "Careers",
    options: [
      {
        id: "NGO Worker",
        label: "NGO Worker",
        next: "",
      },
      {
        id: "Health Educator",
        label: "Health Educator",
        next: "",
      },
      {
        id: "Public Health Campaigner",
        label: "Public Health Campaigner",
        next: "",
      },
    ],
  },
  q3i: {
    id: "q3i",
    step: "STEP 3/3",
    title: "Finance",
    subtitle: "Careers",
    options: [
      {
        id: "Accountant",
        label: "Accountant",
        next: "",
      },
      {
        id: "Auditor",
        label: "Auditor",
        next: "",
      },
      {
        id: "Banker",
        label: "Banker",
        next: "",
      },
    ],
  },
  q3j: {
    id: "q3j",
    step: "STEP 3/3",
    title: "Data",
    subtitle: "Careers",
    options: [
      {
        id: "Data Analysts",
        label: "Data Analyst",
        next: "",
      },
      {
        id: "M&E Officer",
        label: "M&E Officer",
        next: "",
      },
      {
        id: "Statistician",
        label: "Statistician ",
        next: "",
      },
    ],
  },
  q3k: {
    id: "q3k",
    step: "STEP 3/3",
    title: "Logistics",
    subtitle: "Careers",
    options: [
      {
        id: "Supply Chain Analyst",
        label: "Supply Chain Analyst ",
        next: "",
      },
      {
        id: "Procurement Officer",
        label: "Procurement Officer ",
        next: "",
      },
    ],
  },
  q3l: {
    id: "q3l",
    step: "STEP 3/3",
    title: "Speaking",
    subtitle: "Careers",
    options: [
      {
        id: "Teacher",
        label: "Teacher ",
        next: "",
      },
      {
        id: "Speaker",
        label: "Speaker ",
        next: "",
      },
      {
        id: "Lawyer",
        label: "Lawyer ",
        next: "",
      },
    ],
  },
  q3m: {
    id: "q3m",
    step: "STEP 3/3",
    title: "Writing",
    subtitle: "Careers",
    options: [
      {
        id: "Journalist",
        label: "Journalist ",
        next: "",
      },
      {
        id: "Author",
        label: "Author ",
        next: "",
      },
      {
        id: "Copywriter",
        label: "Copywriter ",
        next: "",
      },
    ],
  },
  q3n: {
    id: "q3n",
    step: "STEP 3/3",
    title: "Leadership",
    subtitle: "Careers",
    options: [
      {
        id: "Entrepreneur",
        label: "Entrepreneur ",
        next: "",
      },
      {
        id: "Campaign Manager",
        label: "Campaign Manager ",
        next: "",
      },
      {
        id: "NGO Founder",
        label: "NGO Founder ",
        next: "",
      },
    ],
  },
  q3o: {
    id: "q3o",
    step: "STEP 3/3",
    title: "Innovation",
    subtitle: "Careers",
    options: [
      {
        id: "Consultant",
        label: "Consultant ",
        next: "",
      },
      {
        id: "Product Developer",
        label: "Product Developer ",
        next: "",
      },
    ],
  },
  q3p: {
    id: "q3p",
    step: "STEP 3/3",
    title: "Crafts",
    subtitle: "Careers",
    options: [
      {
        id: "Carpenter",
        label: "Carpenter ",
        next: "",
      },
      {
        id: "Artisan",
        label: "Artisan ",
        next: "",
      },
      {
        id: "Shoemaker",
        label: "Shoemaker ",
        next: "",
      },
    ],
  },
  q3q: {
    id: "q3q",
    step: "STEP 3/3",
    title: "Food",
    subtitle: "Careers",
    options: [
      {
        id: "Chef",
        label: "Chef ",
        next: "",
      },
      {
        id: "Baker",
        label: "Baker ",
        next: "",
      },
      {
        id: "Caterer",
        label: "Caterer ",
        next: "",
      },
    ],
  },
  q3r: {
    id: "q3r",
    step: "STEP 3/3",
    title: "Nature",
    subtitle: "Careers",
    options: [
      {
        id: "Farmer",
        label: "Farmer ",
        next: "",
      },
      {
        id: "Landscape Planner ",
        label: "Landscape Planner ",
        next: "",
      },
    ],
  },
  q3s: {
    id: "q3s",
    step: "STEP 3/3",
    title: "Music",
    subtitle: "Careers",
    options: [
      {
        id: "Producer",
        label: "Producer ",
        next: "",
      },
      {
        id: "Gospel Artist ",
        label: "Gospel Artist ",
        next: "",
      },
      {
        id: "DJ",
        label: "DJ ",
        next: "",
      },
    ],
  },
  q3t: {
    id: "q3t",
    step: "STEP 3/3",
    title: "Content",
    subtitle: "Careers",
    options: [
      {
        id: "YouTuber",
        label: "YouTuber ",
        next: "",
      },
      {
        id: "Skit Maker",
        label: "Skit Maker ",
        next: "",
      },
      {
        id: "Influencer",
        label: "Influencer ",
        next: "",
      },
    ],
  },
  q3u: {
    id: "q3u",
    step: "STEP 3/3",
    title: "Stage",
    subtitle: "Careers",
    options: [
      {
        id: "Actor",
        label: "Actor ",
        next: "",
      },
      {
        id: "MC",
        label: "MC ",
        next: "",
      },
      {
        id: "Comedian",
        label: "Comedian ",
        next: "",
      },
    ],
  },
  q3v: {
    id: "q3v",
    step: "STEP 3/3",
    title: "Realworld Guide",
    subtitle: "Careers",
    options: [
      {
        id: "Tour Host",
        label: "Tour Host ",
        next: "",
      },
      {
        id: "Cultural Educator",
        label: "Cultural Educator ",
        next: "",
      },
    ],
  },
  q3w: {
    id: "q3w",
    step: "STEP 3/3",
    title: "Cultural Study",
    subtitle: "Careers",
    options: [
      {
        id: "Historian",
        label: "Historian ",
        next: "",
      },
      {
        id: "Linguist",
        label: "Linguist ",
        next: "",
      },
    ],
  },
  q3x: {
    id: "q3x",
    step: "STEP 3/3",
    title: "Content + Culture",
    subtitle: "Careers",
    options: [
      {
        id: "Travel Blogger",
        label: "Travel Blogger ",
        next: "",
      },
      {
        id: "Doc Maker",
        label: "Doc Maker ",
        next: "",
      },
    ],
  },
};
