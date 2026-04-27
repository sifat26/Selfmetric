import type { PersonalityColor } from '../types/quiz';

export interface PersonalityType {
  id: PersonalityColor;
  name: string;
  color: string;
  hexColor: string;
  lightColor: string;
  darkColor: string;
  emoji: string;
  tagline: string;
  simpleExplanation: string;
  strengths: string[];
  weaknesses: string[];
  triggers: string[];
  communicationGuide: string;
  improvementPlan: string[];
  happyTriggers: string[];
  warning: string;
}

export const personalityTypes: Record<PersonalityColor, PersonalityType> = {
  red: {
    id: 'red',
    name: 'Driver',
    color: 'Red',
    hexColor: '#EF4444',
    lightColor: '#FEE2E2',
    darkColor: '#DC2626',
    emoji: '🔴',
    tagline: 'You move fast, decide quickly, and focus on outcomes.',
    simpleExplanation: 'You are a results-first person who thrives on challenge and momentum. You have a natural instinct to lead and a low tolerance for inefficiency. People experience you as decisive, confident, and direct. You bring clarity and urgency to any situation.',
    strengths: [
      'Decisive under pressure — you commit without needing perfect information',
      'Natural leadership presence',
      'High output and productivity',
      'Direct and clear communicator'
    ],
    weaknesses: [
      'Can be perceived as blunt or impatient',
      'May rush decisions that needed more time',
      'Tendency to steamroll quieter voices',
      'Can become controlling when not in charge'
    ],
    triggers: [
      'Inefficiency and wasted time',
      'Indecision or slow progress',
      'People not following through on commitments',
      'Lack of control over outcomes'
    ],
    communicationGuide: 'Be direct — skip the long preamble and lead with the point. Show confidence and come with solutions, not just problems. Respect their time by being concise.',
    improvementPlan: [
      'Practice active listening before responding',
      'Recognize that slowing down sometimes produces faster results',
      'Invest in relationship equity',
      'Celebrate incremental wins'
    ],
    happyTriggers: [
      'Achieving difficult goals',
      'Taking charge of chaotic situations',
      'Seeing immediate, tangible results',
      'Winning or succeeding against the odds'
    ],
    warning: 'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.'
  },

  yellow: {
    id: 'yellow',
    name: 'Influencer',
    color: 'Yellow',
    hexColor: '#F59E0B',
    lightColor: '#FEF3C7',
    darkColor: '#D97706',
    emoji: '🟡',
    tagline: 'You light up rooms, energize people, and make ideas contagious.',
    simpleExplanation: 'You are a natural connector and energizer. You think in possibilities, thrive in people-rich environments, and have a gift for making others feel excited and inspired. You transform reluctant rooms into motivated teams.',
    strengths: [
      'Naturally charismatic and engaging',
      'Exceptional at motivating others',
      'Creative and idea-rich',
      'Optimistic in the face of setbacks'
    ],
    weaknesses: [
      'May overpromise and struggle to follow through',
      'Can get distracted or lose focus easily',
      'May prioritize fun over deadlines',
      'Can be disorganized or scattered'
    ],
    triggers: [
      'Feeling ignored or excluded',
      'Overly strict rules or routine',
      'Pessimism and negativity',
      'Boring, repetitive tasks'
    ],
    communicationGuide: 'Start with connection and warmth. Be enthusiastic about ideas and match their energy. Give them space to express themselves freely and acknowledge their contributions openly.',
    improvementPlan: [
      'Practice finishing what you start',
      'Build systems to help with follow-through',
      'Listen more than you speak in key moments',
      'Learn to sit with uncomfortable truths'
    ],
    happyTriggers: [
      'Socializing and meeting new people',
      'Brainstorming exciting new ideas',
      'Being recognized and appreciated',
      'Having fun and laughing with others'
    ],
    warning: 'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.'
  },

  green: {
    id: 'green',
    name: 'Supporter',
    color: 'Green',
    hexColor: '#10B981',
    lightColor: '#D1FAE5',
    darkColor: '#059669',
    emoji: '🟢',
    tagline: 'You bring calm, loyalty, and care that hold teams together.',
    simpleExplanation: 'You are the stabilizing force that groups need. You lead with empathy, listen deeply, and create safety for others. You are consistent, dependable, and deeply committed to the people you care about.',
    strengths: [
      'Deep listening and high empathy',
      'Loyal, reliable, and consistent',
      'Natural mediator who finds peaceful resolutions',
      'Deeply caring about others\' wellbeing'
    ],
    weaknesses: [
      'Difficulty saying no to people',
      'Avoids necessary conflict',
      'May suppress own needs for harmony',
      'Can be resistant to sudden change'
    ],
    triggers: [
      'Conflict, arguing, or raised voices',
      'Sudden, unexpected changes',
      'Feeling unappreciated or taken for granted',
      'Pressure to make immediate, risky decisions'
    ],
    communicationGuide: 'Be patient and give them time to think. Create a safe space without harsh directness. Ask for their opinion gently, and give advance notice before introducing big changes.',
    improvementPlan: [
      'Practice setting clear boundaries',
      'Name your own needs out loud',
      'Develop comfort with healthy conflict',
      'Recognize your burnout signals early'
    ],
    happyTriggers: [
      'Deep, meaningful conversations',
      'Helping someone in a tangible way',
      'Peaceful, stable environments',
      'Feeling genuinely valued by loved ones'
    ],
    warning: 'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.'
  },

  blue: {
    id: 'blue',
    name: 'Analyst',
    color: 'Blue',
    hexColor: '#3B82F6',
    lightColor: '#DBEAFE',
    darkColor: '#2563EB',
    emoji: '🔵',
    tagline: 'You think deeply, act carefully, and raise the standard for everyone.',
    simpleExplanation: 'You are a rigorous, systematic thinker who values accuracy and quality above speed. You notice details others miss and produce work of consistently high caliber. You are the intellectual backbone of any endeavor.',
    strengths: [
      'Exceptional analytical ability',
      'High standards and attention to detail',
      'Systematic problem-solving',
      'Reliable and consistent in quality'
    ],
    weaknesses: [
      'Analysis paralysis — overthinking decisions',
      'Can be perceived as overly critical',
      'Struggles with ambiguity or rapid change',
      'Perfectionism can slow progress'
    ],
    triggers: [
      'Careless mistakes or sloppy work',
      'Being rushed into a decision without facts',
      'Overly emotional or illogical arguments',
      'Lack of clear structure or rules'
    ],
    communicationGuide: 'Come prepared with facts and reasoning. Be precise and avoid vague statements. Give them time to process before expecting a response, and respect their high standards.',
    improvementPlan: [
      'Practice "good enough for now"',
      'Develop emotional vocabulary',
      'Trust your analysis to act without 100% certainty',
      'Acknowledge effort before critiquing execution'
    ],
    happyTriggers: [
      'Solving complex problems',
      'Having dedicated time to focus deeply',
      'Creating perfectly organized systems',
      'Being recognized for their expertise'
    ],
    warning: 'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.'
  }
};
