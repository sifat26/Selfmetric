import type { QuizQuestion } from "../types/quiz";

export const coreQuestions: QuizQuestion[] = [
  {
    id: "core-1",
    phase: "core",
    category: "behavior",
    subCategory: "group project",
    question: "You are in a group project. What do you usually do?",
    options: [
      { id: "A", text: "Take charge and decide what everyone should do", scores: { red: 2 } },
      { id: "B", text: "Focus on doing your part perfectly", scores: { blue: 2 } },
      { id: "C", text: "Help everyone and keep things peaceful", scores: { green: 2 } },
      { id: "D", text: "Bring energy and ideas to make it fun", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-2",
    phase: "core",
    category: "lifestyle",
    subCategory: "cancelled plan",
    question: "Your plan gets cancelled last minute. What do you do?",
    options: [
      { id: "A", text: "Get annoyed and try to fix it quickly", scores: { red: 2 } },
      { id: "B", text: "Ask for reasons and think about it", scores: { blue: 2 } },
      { id: "C", text: "Accept it and stay calm", scores: { green: 2 } },
      { id: "D", text: "Move on and find something else fun", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-3",
    phase: "core",
    category: "behavior",
    subCategory: "important decision",
    question: "When you need to make an important decision:",
    options: [
      { id: "A", text: "Decide fast and move forward", scores: { red: 2 } },
      { id: "B", text: "Think deeply and analyze all options", scores: { blue: 2 } },
      { id: "C", text: "Ask others and consider feelings", scores: { green: 2 } },
      { id: "D", text: "Go with what feels right", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-4",
    phase: "core",
    category: "social_style",
    subCategory: "argument",
    question: "If someone argues with you:",
    options: [
      { id: "A", text: "Stand strong and defend your point", scores: { red: 2 } },
      { id: "B", text: "Use logic and explain clearly", scores: { blue: 2 } },
      { id: "C", text: "Try to avoid conflict and calm things down", scores: { green: 2 } },
      { id: "D", text: "Joke or change topic to reduce tension", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-5",
    phase: "core",
    category: "lifestyle",
    subCategory: "free time",
    question: "In your free time, you prefer:",
    options: [
      { id: "A", text: "Doing something productive or goal-focused", scores: { red: 2 } },
      { id: "B", text: "Learning something new or useful", scores: { blue: 2 } },
      { id: "C", text: "Relaxing quietly or with close people", scores: { green: 2 } },
      { id: "D", text: "Hanging out and enjoying with others", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-6",
    phase: "core",
    category: "emotions",
    subCategory: "anger",
    question: "When you feel angry:",
    options: [
      { id: "A", text: "Express it immediately", scores: { red: 2 } },
      { id: "B", text: "Think about why it happened", scores: { blue: 2 } },
      { id: "C", text: "Stay quiet and avoid reaction", scores: { green: 2 } },
      { id: "D", text: "Try to distract yourself", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-7",
    phase: "core",
    category: "lifestyle",
    subCategory: "responsibility",
    question: "When given responsibility:",
    options: [
      { id: "A", text: "Take control and lead", scores: { red: 2 } },
      { id: "B", text: "Plan carefully before starting", scores: { blue: 2 } },
      { id: "C", text: "Do your part and support others", scores: { green: 2 } },
      { id: "D", text: "Do it in your own flexible way", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-8",
    phase: "core",
    category: "social_style",
    subCategory: "meeting new people",
    question: "When meeting new people:",
    options: [
      { id: "A", text: "Try to take the lead in conversation", scores: { red: 2 } },
      { id: "B", text: "Observe first before talking", scores: { blue: 2 } },
      { id: "C", text: "Be polite and listen more", scores: { green: 2 } },
      { id: "D", text: "Talk easily and make jokes", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-9",
    phase: "core",
    category: "behavior",
    subCategory: "deadline",
    question: "When you have a deadline:",
    options: [
      { id: "A", text: "Focus and push hard to finish fast", scores: { red: 2 } },
      { id: "B", text: "Plan step by step and stay organized", scores: { blue: 2 } },
      { id: "C", text: "Stay calm and do it steadily", scores: { green: 2 } },
      { id: "D", text: "Do it in bursts and take breaks", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-10",
    phase: "core",
    category: "emotions",
    subCategory: "criticism",
    question: "If someone criticizes you:",
    options: [
      { id: "A", text: "Defend yourself immediately", scores: { red: 2 } },
      { id: "B", text: "Think if it is logical or not", scores: { blue: 2 } },
      { id: "C", text: "Feel bad but stay quiet", scores: { green: 2 } },
      { id: "D", text: "Laugh it off or ignore it", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-11",
    phase: "core",
    category: "behavior",
    subCategory: "leadership",
    question: "If you become a leader:",
    options: [
      { id: "A", text: "Give clear instructions and expect results", scores: { red: 2 } },
      { id: "B", text: "Focus on quality and details", scores: { blue: 2 } },
      { id: "C", text: "Support and guide your team", scores: { green: 2 } },
      { id: "D", text: "Motivate and inspire people", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-12",
    phase: "core",
    category: "behavior",
    subCategory: "planning preference",
    question: "You prefer:",
    options: [
      { id: "A", text: "Quick action over planning", scores: { red: 2 } },
      { id: "B", text: "Detailed planning", scores: { blue: 2 } },
      { id: "C", text: "Safe and steady approach", scores: { green: 2 } },
      { id: "D", text: "Going with the flow", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-13",
    phase: "core",
    category: "behavior",
    subCategory: "slow people",
    question: "If someone is too slow:",
    options: [
      { id: "A", text: "Get frustrated and push them", scores: { red: 2 } },
      { id: "B", text: "Try to understand the reason", scores: { blue: 2 } },
      { id: "C", text: "Be patient and wait", scores: { green: 2 } },
      { id: "D", text: "Ignore it and move on", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-14",
    phase: "core",
    category: "emotions",
    subCategory: "emotional expression",
    question: "You usually:",
    options: [
      { id: "A", text: "Say what you feel directly", scores: { red: 2 } },
      { id: "B", text: "Think before expressing", scores: { blue: 2 } },
      { id: "C", text: "Keep feelings inside", scores: { green: 2 } },
      { id: "D", text: "Express freely and emotionally", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-15",
    phase: "core",
    category: "behavior",
    subCategory: "risk",
    question: "When facing risk:",
    options: [
      { id: "A", text: "Take it if it leads to success", scores: { red: 2 } },
      { id: "B", text: "Analyze before taking it", scores: { blue: 2 } },
      { id: "C", text: "Avoid it if possible", scores: { green: 2 } },
      { id: "D", text: "Take it for the experience", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-16",
    phase: "core",
    category: "behavior",
    subCategory: "natural role",
    question: "You are usually:",
    options: [
      { id: "A", text: "The leader", scores: { red: 2 } },
      { id: "B", text: "The planner", scores: { blue: 2 } },
      { id: "C", text: "The supporter", scores: { green: 2 } },
      { id: "D", text: "The motivator", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-17",
    phase: "core",
    category: "emotions",
    subCategory: "failure response",
    question: "If something fails:",
    options: [
      { id: "A", text: "Get frustrated and try again fast", scores: { red: 2 } },
      { id: "B", text: "Analyze what went wrong", scores: { blue: 2 } },
      { id: "C", text: "Accept it and move on slowly", scores: { green: 2 } },
      { id: "D", text: "Forget it and shift focus", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-18",
    phase: "core",
    category: "social_style",
    subCategory: "communication preference",
    question: "You prefer:",
    options: [
      { id: "A", text: "Direct and short communication", scores: { red: 2 } },
      { id: "B", text: "Clear and detailed communication", scores: { blue: 2 } },
      { id: "C", text: "Calm and polite communication", scores: { green: 2 } },
      { id: "D", text: "Fun and expressive communication", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-19",
    phase: "core",
    category: "lifestyle",
    subCategory: "motivation",
    question: "You are motivated by:",
    options: [
      { id: "A", text: "Success and achievement", scores: { red: 2 } },
      { id: "B", text: "Knowledge and improvement", scores: { blue: 2 } },
      { id: "C", text: "Stability and peace", scores: { green: 2 } },
      { id: "D", text: "Fun and enjoyment", scores: { yellow: 2 } }
    ]
  },
  {
    id: "core-20",
    phase: "core",
    category: "lifestyle",
    subCategory: "ideal life",
    question: "Your ideal life is:",
    options: [
      { id: "A", text: "Successful and powerful", scores: { red: 2 } },
      { id: "B", text: "Organized and meaningful", scores: { blue: 2 } },
      { id: "C", text: "Peaceful and stable", scores: { green: 2 } },
      { id: "D", text: "Exciting and enjoyable", scores: { yellow: 2 } }
    ]
  }
];
