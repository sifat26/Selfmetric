import type { PersonalityColor, QuizQuestion } from "../types/quiz";

export const adaptiveQuestions: Record<PersonalityColor, QuizQuestion[]> = {
  red: [
    {
      id: "adaptive-red-1",
      phase: "adaptive",
      path: "red",
      category: "behavior",
      subCategory: "control",
      question: "When people don’t follow your instructions:",
      options: [
        { id: "A", text: "I get frustrated quickly", scores: { red: 2 } },
        { id: "B", text: "I try to explain again logically", scores: { blue: 2 } },
        { id: "C", text: "I stay calm and let it go", scores: { green: 2 } },
        { id: "D", text: "I joke about it and move on", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-red-2",
      phase: "adaptive",
      path: "red",
      category: "behavior",
      subCategory: "leadership",
      question: "When you are in charge of something:",
      options: [
        { id: "A", text: "I like full control", scores: { red: 2 } },
        { id: "B", text: "I focus on doing it correctly", scores: { blue: 2 } },
        { id: "C", text: "I make sure everyone is comfortable", scores: { green: 2 } },
        { id: "D", text: "I keep things flexible", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-red-3",
      phase: "adaptive",
      path: "red",
      category: "behavior",
      subCategory: "patience",
      question: "If someone is too slow:",
      options: [
        { id: "A", text: "I push them to go faster", scores: { red: 2 } },
        { id: "B", text: "I analyze why they are slow", scores: { blue: 2 } },
        { id: "C", text: "I stay patient", scores: { green: 2 } },
        { id: "D", text: "I ignore it", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-red-4",
      phase: "adaptive",
      path: "red",
      category: "emotions",
      subCategory: "anger",
      question: "When things don’t go your way:",
      options: [
        { id: "A", text: "I get angry and react", scores: { red: 2 } },
        { id: "B", text: "I think about what went wrong", scores: { blue: 2 } },
        { id: "C", text: "I accept it quietly", scores: { green: 2 } },
        { id: "D", text: "I distract myself", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-red-5",
      phase: "adaptive",
      path: "red",
      category: "social_style",
      subCategory: "control",
      question: "People often say you are:",
      options: [
        { id: "A", text: "Too direct", scores: { red: 2 } },
        { id: "B", text: "Too serious", scores: { blue: 2 } },
        { id: "C", text: "Too quiet", scores: { green: 2 } },
        { id: "D", text: "Too relaxed", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-red-6",
      phase: "adaptive",
      path: "red",
      category: "behavior",
      subCategory: "leadership",
      question: "When making decisions:",
      options: [
        { id: "A", text: "I decide fast and move", scores: { red: 2 } },
        { id: "B", text: "I think deeply first", scores: { blue: 2 } },
        { id: "C", text: "I consider everyone", scores: { green: 2 } },
        { id: "D", text: "I go with the flow", scores: { yellow: 2 } }
      ]
    }
  ],
  blue: [
    {
      id: "adaptive-blue-1",
      phase: "adaptive",
      path: "blue",
      category: "behavior",
      subCategory: "perfection",
      question: "When doing a task:",
      options: [
        { id: "A", text: "I want it done fast", scores: { red: 2 } },
        { id: "B", text: "I want it perfect", scores: { blue: 2 } },
        { id: "C", text: "I want it peaceful", scores: { green: 2 } },
        { id: "D", text: "I want it enjoyable", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-blue-2",
      phase: "adaptive",
      path: "blue",
      category: "emotions",
      subCategory: "perfection",
      question: "If something is not perfect:",
      options: [
        { id: "A", text: "I ignore it and move on", scores: { red: 2 } },
        { id: "B", text: "It bothers me a lot", scores: { blue: 2 } },
        { id: "C", text: "I accept it", scores: { green: 2 } },
        { id: "D", text: "I laugh it off", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-blue-3",
      phase: "adaptive",
      path: "blue",
      category: "behavior",
      subCategory: "overthinking",
      question: "When making decisions:",
      options: [
        { id: "A", text: "I act quickly", scores: { red: 2 } },
        { id: "B", text: "I overthink a lot", scores: { blue: 2 } },
        { id: "C", text: "I ask others", scores: { green: 2 } },
        { id: "D", text: "I go by feeling", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-blue-4",
      phase: "adaptive",
      path: "blue",
      category: "emotions",
      subCategory: "emotions",
      question: "When someone criticizes your work:",
      options: [
        { id: "A", text: "I defend myself", scores: { red: 2 } },
        { id: "B", text: "I take it seriously and think deeply", scores: { blue: 2 } },
        { id: "C", text: "I feel bad but stay quiet", scores: { green: 2 } },
        { id: "D", text: "I ignore it", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-blue-5",
      phase: "adaptive",
      path: "blue",
      category: "emotions",
      subCategory: "overthinking",
      question: "You often feel:",
      options: [
        { id: "A", text: "Impatient", scores: { red: 2 } },
        { id: "B", text: "Stressed from thinking too much", scores: { blue: 2 } },
        { id: "C", text: "Calm", scores: { green: 2 } },
        { id: "D", text: "Excited", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-blue-6",
      phase: "adaptive",
      path: "blue",
      category: "lifestyle",
      subCategory: "perfection",
      question: "In your daily life:",
      options: [
        { id: "A", text: "I focus on results", scores: { red: 2 } },
        { id: "B", text: "I focus on details", scores: { blue: 2 } },
        { id: "C", text: "I focus on people", scores: { green: 2 } },
        { id: "D", text: "I focus on fun", scores: { yellow: 2 } }
      ]
    }
  ],
  green: [
    {
      id: "adaptive-green-1",
      phase: "adaptive",
      path: "green",
      category: "social_style",
      subCategory: "saying no",
      question: "When someone asks for help:",
      options: [
        { id: "A", text: "I decide if it is useful", scores: { red: 2 } },
        { id: "B", text: "I think before agreeing", scores: { blue: 2 } },
        { id: "C", text: "I say yes even if I am busy", scores: { green: 2 } },
        { id: "D", text: "I agree if it feels good", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-green-2",
      phase: "adaptive",
      path: "green",
      category: "behavior",
      subCategory: "avoiding conflict",
      question: "When there is conflict:",
      options: [
        { id: "A", text: "I face it directly", scores: { red: 2 } },
        { id: "B", text: "I explain logically", scores: { blue: 2 } },
        { id: "C", text: "I avoid it", scores: { green: 2 } },
        { id: "D", text: "I change the topic", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-green-3",
      phase: "adaptive",
      path: "green",
      category: "emotions",
      subCategory: "comfort zone",
      question: "When you feel uncomfortable:",
      options: [
        { id: "A", text: "I deal with it directly", scores: { red: 2 } },
        { id: "B", text: "I analyze it", scores: { blue: 2 } },
        { id: "C", text: "I stay quiet", scores: { green: 2 } },
        { id: "D", text: "I escape it", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-green-4",
      phase: "adaptive",
      path: "green",
      category: "social_style",
      subCategory: "saying no",
      question: "Saying “no” to people:",
      options: [
        { id: "A", text: "Easy", scores: { red: 2 } },
        { id: "B", text: "Depends on the situation", scores: { blue: 2 } },
        { id: "C", text: "Very hard", scores: { green: 2 } },
        { id: "D", text: "I avoid answering", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-green-5",
      phase: "adaptive",
      path: "green",
      category: "lifestyle",
      subCategory: "comfort zone",
      question: "In life, you prefer:",
      options: [
        { id: "A", text: "Growth and success", scores: { red: 2 } },
        { id: "B", text: "Knowledge and structure", scores: { blue: 2 } },
        { id: "C", text: "Stability and peace", scores: { green: 2 } },
        { id: "D", text: "Freedom and fun", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-green-6",
      phase: "adaptive",
      path: "green",
      category: "social_style",
      subCategory: "avoiding conflict",
      question: "People often see you as:",
      options: [
        { id: "A", text: "Strong", scores: { red: 2 } },
        { id: "B", text: "Smart", scores: { blue: 2 } },
        { id: "C", text: "Kind", scores: { green: 2 } },
        { id: "D", text: "Fun", scores: { yellow: 2 } }
      ]
    }
  ],
  yellow: [
    {
      id: "adaptive-yellow-1",
      phase: "adaptive",
      path: "yellow",
      category: "behavior",
      subCategory: "focus",
      question: "When starting something new:",
      options: [
        { id: "A", text: "I focus on results", scores: { red: 2 } },
        { id: "B", text: "I plan carefully", scores: { blue: 2 } },
        { id: "C", text: "I take it slow", scores: { green: 2 } },
        { id: "D", text: "I get excited quickly", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-yellow-2",
      phase: "adaptive",
      path: "yellow",
      category: "behavior",
      subCategory: "consistency",
      question: "Finishing tasks:",
      options: [
        { id: "A", text: "I finish fast", scores: { red: 2 } },
        { id: "B", text: "I finish perfectly", scores: { blue: 2 } },
        { id: "C", text: "I finish steadily", scores: { green: 2 } },
        { id: "D", text: "I sometimes leave them unfinished", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-yellow-3",
      phase: "adaptive",
      path: "yellow",
      category: "lifestyle",
      subCategory: "discipline",
      question: "Routine and discipline:",
      options: [
        { id: "A", text: "Important for success", scores: { red: 2 } },
        { id: "B", text: "Necessary for structure", scores: { blue: 2 } },
        { id: "C", text: "Helpful for stability", scores: { green: 2 } },
        { id: "D", text: "Feels boring", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-yellow-4",
      phase: "adaptive",
      path: "yellow",
      category: "lifestyle",
      subCategory: "focus",
      question: "When bored:",
      options: [
        { id: "A", text: "I find something productive", scores: { red: 2 } },
        { id: "B", text: "I learn something", scores: { blue: 2 } },
        { id: "C", text: "I relax", scores: { green: 2 } },
        { id: "D", text: "I look for fun", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-yellow-5",
      phase: "adaptive",
      path: "yellow",
      category: "social_style",
      subCategory: "consistency",
      question: "People often say you are:",
      options: [
        { id: "A", text: "Too serious", scores: { red: 2 } },
        { id: "B", text: "Too detailed", scores: { blue: 2 } },
        { id: "C", text: "Too calm", scores: { green: 2 } },
        { id: "D", text: "Too distracted", scores: { yellow: 2 } }
      ]
    },
    {
      id: "adaptive-yellow-6",
      phase: "adaptive",
      path: "yellow",
      category: "behavior",
      subCategory: "discipline",
      question: "In long-term goals:",
      options: [
        { id: "A", text: "I push hard", scores: { red: 2 } },
        { id: "B", text: "I plan everything", scores: { blue: 2 } },
        { id: "C", text: "I go slowly", scores: { green: 2 } },
        { id: "D", text: "I lose interest sometimes", scores: { yellow: 2 } }
      ]
    }
  ]
};
