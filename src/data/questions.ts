export type PersonalityTypeId = 'red' | 'yellow' | 'green' | 'blue';

export interface OptionScores {
  red: number;
  yellow: number;
  green: number;
  blue: number;
}

export interface QuizOption {
  text: string;
  scores: OptionScores;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: QuizOption[];
  isReverse?: boolean;
}

export const questions: QuizQuestion[] = [
  // ─── DECISION MAKING ────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'decision_making',
    question: 'When a team is stuck and no one knows what to do, you usually:',
    options: [
      { text: 'Step up, pick a direction, and get everyone moving', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Energize the room by throwing ideas around and rallying spirits', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Make sure everyone feels heard and the group stays cohesive', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Suggest pausing to gather more information before deciding', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 2,
    category: 'decision_making',
    question: 'A vendor offers you two deals: one saves money but carries more risk, the other is safe but costs more. You:',
    options: [
      { text: 'Take the riskier deal — the savings justify it and you can manage the risk', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Go with the safe deal — peace of mind is worth the extra cost', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Ask colleagues for their gut feelings before deciding', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Build a comparison spreadsheet and stress-test both scenarios', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 3,
    category: 'decision_making',
    question: 'You need to hire one of two candidates. You have limited time. You:',
    options: [
      { text: 'Go with the one who showed the most drive and potential', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Choose the one who seemed most likable and a cultural fit', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Pick the one who seemed most reliable and wouldn\'t disrupt the team', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Review their assessments and reference notes systematically', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 4,
    category: 'decision_making',
    question: 'When you must choose between two paths and both have trade-offs, your first move is to:',
    options: [
      { text: 'Trust your instincts and commit fast', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Talk it through with people whose opinions you value', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Think about which option keeps everyone happy', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Map out risks and weigh evidence for each option', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── CONFLICT HANDLING ───────────────────────────────────────────────────────
  {
    id: 5,
    category: 'conflict_handling',
    question: 'A teammate is repeatedly late delivering their work, slowing your project. You:',
    options: [
      { text: 'Confront them directly and set a clear deadline with consequences', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Have a casual chat to understand what\'s going on and recharge their motivation', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Try to quietly absorb some of their tasks to keep the peace', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Document the delays and present data to your manager for a formal solution', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 6,
    category: 'conflict_handling',
    question: 'Two colleagues disagree loudly in a meeting you\'re part of. You:',
    options: [
      { text: 'Cut to the chase: "Here\'s what we\'re doing — let\'s move on."', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Lighten the mood and help both sides laugh it off', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Calmly mediate and encourage them to find middle ground', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Ask each person to state their evidence calmly before anyone reacts', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 7,
    category: 'conflict_handling',
    question: 'Someone pushes back hard on your idea in public. Your first internal reaction is:',
    options: [
      { text: 'Annoyance — you\'re confident in your idea and want to defend it', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Surprise but curiosity — you\'re open if the conversation stays energetic', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Discomfort — you don\'t like public disagreement', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Detachment — you want to evaluate their argument objectively', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 8,
    category: 'conflict_handling',
    question: 'After a heated argument with a colleague, you typically:',
    options: [
      { text: 'Shake it off quickly and move on — it\'s just business', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Reach out soon to repair the relationship and restore good vibes', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel unsettled for a while and replay the conversation in your head', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Reflect on what was said logically to see who was right', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── COMMUNICATION STYLE ─────────────────────────────────────────────────────
  {
    id: 9,
    category: 'communication_style',
    question: 'When explaining a complex idea to someone, you tend to:',
    options: [
      { text: 'Give a short, punchy summary and let them ask questions', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Use stories, examples, and enthusiasm to make it vivid', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Check frequently if they\'re following and adjust your pace', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Walk through it step by step with precise detail', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 10,
    category: 'communication_style',
    question: 'When you write a work email, it usually:',
    options: [
      { text: 'Gets straight to the point with a clear ask at the top', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Has a warm opener and upbeat tone before the main content', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Is polite, considerate, and checks if the recipient has any concerns', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Is structured with bullet points, data, or clear sections', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 11,
    category: 'communication_style',
    question: 'In a casual conversation you\'ve just joined, you typically:',
    options: [
      { text: 'Steer it toward something actionable or meaningful quickly', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Jump in, make jokes, and keep the energy up', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Listen more than you speak, and ask about others', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Listen carefully and speak up when you have something precise to add', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 12,
    category: 'communication_style',
    question: 'Someone sends you a long, rambling message. Your instinct is to:',
    options: [
      { text: 'Skim it fast and reply with only the essential point', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Respond warmly and probably pick up the phone to chat instead', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Read it fully to understand what they really need', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Re-read it carefully to extract each point before replying', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── TEAMWORK ────────────────────────────────────────────────────────────────
  {
    id: 13,
    category: 'teamwork',
    question: 'In a team project, the role you naturally drift toward is:',
    options: [
      { text: 'The one pushing for faster progress and clear ownership', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'The one keeping morale up and making sure everyone collaborates', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'The one quietly supporting whoever needs help the most', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'The one making sure the plan is solid before you start executing', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 14,
    category: 'teamwork',
    question: 'A teammate asks you for honest feedback on their presentation. You:',
    options: [
      { text: 'Tell them exactly what\'s weak and what they need to fix — directly', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Start with what\'s great, add suggestions gently, end with encouragement', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Focus mostly on positives to protect their confidence', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Give specific, structured feedback with examples for each point', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 15,
    category: 'teamwork',
    question: 'Your team\'s group chat is quiet during a critical week. You:',
    options: [
      { text: 'Send a message holding people accountable: "Where are we on X?"', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Post something fun or uplifting to get energy flowing again', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Privately check in with individuals to see if anyone needs support', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Share a progress update with data or a status overview', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 16,
    category: 'teamwork',
    question: 'Your team disagrees on how to divide work. You:',
    options: [
      { text: 'Assign roles based on what\'s most efficient for results', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Let everyone pick what excites them most', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Make sure no one feels burdened and everyone is comfortable', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Match roles to people based on skills and track record', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── LEADERSHIP ──────────────────────────────────────────────────────────────
  {
    id: 17,
    category: 'leadership',
    question: 'When leading a group, you feel most effective when you:',
    options: [
      { text: 'Set the direction clearly and hold people to high standards', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Inspire the team with a compelling vision and positive energy', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Build an environment where everyone feels safe to contribute', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Implement proven processes and careful quality control', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 18,
    category: 'leadership',
    question: 'A team member is underperforming. As a leader you:',
    options: [
      { text: 'Have a direct conversation: this needs to improve by a specific date', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Motivate them by reminding them of the bigger picture and their potential', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Try to understand personal factors affecting them and offer support', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Analyze their work patterns and set a structured improvement plan', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 19,
    category: 'leadership',
    question: 'Your team has just hit a major setback. Your first priority is:',
    options: [
      { text: 'Identify the cause fast and issue a new plan immediately', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Lift morale so the team doesn\'t lose heart', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Check in with each person to see how they\'re feeling', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Do a careful post-mortem to understand exactly what went wrong', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 20,
    category: 'leadership',
    question: 'When delegating tasks, you prefer to:',
    options: [
      { text: 'Hand it off with clear expectations and minimal hand-holding', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Sell the task as an exciting opportunity and let them figure it out', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Ask about their comfort level and check in regularly', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Provide detailed instructions and success criteria upfront', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── STRESS RESPONSE ─────────────────────────────────────────────────────────
  {
    id: 21,
    category: 'stress_response',
    question: 'When your workload suddenly doubles, your reaction is:',
    options: [
      { text: 'Prioritize ruthlessly and cut anything non-essential', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Rally support from others and push through with energy', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel overwhelmed but quietly keep going without complaining', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Create a structured schedule to make the workload feel manageable', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 22,
    category: 'stress_response',
    question: 'Under significant pressure, other people would notice that you:',
    options: [
      { text: 'Become more demanding and impatient', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Become louder and more scattered', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Withdraw and become unusually quiet', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Become more critical and picky about details', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 23,
    category: 'stress_response',
    question: 'When a deadline is missed on something you care about, you:',
    options: [
      { text: 'Get frustrated and push hard to recover the time immediately', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Vent briefly to a trusted colleague then bounce back with new energy', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Absorb the stress internally and worry about the impact on others', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Document what went wrong and analyze how to prevent it next time', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 24,
    category: 'stress_response',
    question: 'When everything feels chaotic and unclear, you cope by:',
    options: [
      { text: 'Taking charge of whatever you can control right now', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Talking to people — the social connection calms you', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Sticking to familiar routines for stability', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Writing things down and making sense of the situation logically', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── PLANNING ────────────────────────────────────────────────────────────────
  {
    id: 25,
    category: 'planning',
    question: 'When starting a new project, your first instinct is:',
    options: [
      { text: 'Define the goal and get started — figure out details as you go', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Brainstorm wildly and get people excited about the possibilities', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Make sure everyone on the team is aligned and comfortable', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Create a detailed project plan before touching anything', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 26,
    category: 'planning',
    question: 'Your workspace and task management style would best be described as:',
    options: [
      { text: 'Minimal and outcomes-focused — you only track what matters most', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Creative and fluid — ideas everywhere, spontaneous and fast-moving', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Comfortable and consistent — you have reliable systems that work for you', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Organized and thorough — everything has a place and a checklist', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 27,
    category: 'planning',
    question: 'When a plan you made suddenly changes, you:',
    options: [
      { text: 'Adapt fast and redirect energy toward the new goal', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'See it as a fun challenge and improvise with enthusiasm', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel unsettled but accommodate the change to keep harmony', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Feel frustrated that the plan wasn\'t solid enough and rebuild it carefully', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 28,
    category: 'planning',
    question: 'You\'re planning a team event. You focus most on:',
    options: [
      { text: 'Making sure it achieves its purpose efficiently', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Making it fun, memorable, and exciting for everyone', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Making sure everyone is included and no one feels left out', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Getting all the logistics right so nothing goes wrong', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },

  // ─── FEEDBACK STYLE ──────────────────────────────────────────────────────────
  {
    id: 29,
    category: 'feedback_style',
    question: 'When you receive critical feedback, your first reaction is usually:',
    options: [
      { text: 'Evaluate if it\'s valid, then either act or push back', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Feel a brief sting but move on — you don\'t dwell on it long', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel hurt, even if you don\'t show it, and replay it later', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Analyze the feedback carefully to see if it\'s accurate', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 30,
    category: 'feedback_style',
    question: 'When giving feedback to someone who made a significant mistake, you:',
    options: [
      { text: 'State the problem clearly and set expectations for correction', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Use humor or a positive frame to soften it but still get the point across', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Approach it with sensitivity and check how they\'re feeling first', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Lay out the facts of what happened and what should have happened', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  // ─── REVERSE/CONSISTENCY QUESTIONS ──────────────────────────────────────────
  {
    id: 31,
    category: 'feedback_style',
    isReverse: true,
    question: 'You\'re proud of work you completed under pressure. If your manager skips acknowledging it, you:',
    options: [
      { text: 'Don\'t mind — results speak for themselves', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Feel deflated — recognition from others matters to you', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel quietly disappointed but wouldn\'t say anything', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Wonder if your quality of work wasn\'t up to standard', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
  {
    id: 32,
    category: 'planning',
    isReverse: true,
    question: 'You\'re offered a new role that\'s exciting but comes with a lot of uncertainty. You:',
    options: [
      { text: 'Jump at it — the challenge is the point', scores: { red: 3, yellow: 0, green: 0, blue: 0 } },
      { text: 'Get excited by the newness and trust it\'ll work out', scores: { red: 0, yellow: 3, green: 0, blue: 0 } },
      { text: 'Feel hesitant — you need to feel confident in what you\'re stepping into', scores: { red: 0, yellow: 0, green: 3, blue: 0 } },
      { text: 'Research it thoroughly before making any commitment', scores: { red: 0, yellow: 0, green: 0, blue: 3 } },
    ],
  },
];
