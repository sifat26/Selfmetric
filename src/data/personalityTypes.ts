import type { PersonalityTypeId } from './questions';

export interface PersonalityType {
  id: PersonalityTypeId;
  name: string;
  color: string;
  hexColor: string;
  lightColor: string;
  darkColor: string;
  emoji: string;
  tagline: string;
  overview: string;
  coreMotivation: string;
  strengths: string[];
  blindSpots: string[];
  communicationStyle: string;
  underStress: string;
  decisionStyle: string;
  teamworkStyle: string;
  leadershipStyle: string;
  conflictStyle: string;
  bestEnvironment: string;
  howOthersShouldCommunicate: string[];
  growthTips: string[];
  careerFit: string[];
  relationshipTips: string[];
  warning: string;
}

export const personalityTypes: Record<PersonalityTypeId, PersonalityType> = {
  red: {
    id: 'red',
    name: 'Driver',
    color: 'Red',
    hexColor: '#EF4444',
    lightColor: '#FEE2E2',
    darkColor: '#DC2626',
    emoji: '🔴',
    tagline: 'You move fast, decide quickly, and focus on outcomes.',
    overview:
      'You are a results-first person who thrives on challenge and momentum. You have a natural instinct to lead, a low tolerance for inefficiency, and a drive to make things happen — often before others have even finished deliberating. People experience you as decisive, confident, and direct. At your best, you transform stagnation into action and turn vague goals into concrete victories. You bring a clarity and urgency that others often need but rarely supply.',
    coreMotivation:
      'You are motivated by achievement, control over outcomes, and the feeling of winning. You want to have impact. Sitting still, waiting for consensus, or repeating what has already been done drains you. You are energized by challenges that stretch your limits and by the satisfaction of seeing results you can point to.',
    strengths: [
      'Decisive under pressure — you commit without needing perfect information',
      'Natural leadership presence that others gravitate to in crises',
      'High output and productivity — you finish what you start',
      'Direct and clear communicator — no games or ambiguity',
      'Fearless in the face of difficult conversations or bold moves',
      'Competitive drive that raises the standard for those around you',
      'Efficient — you cut waste and keep everyone focused on what matters',
    ],
    blindSpots: [
      'Can be perceived as blunt, impatient, or dismissive of others\' feelings',
      'May rush decisions that needed more time or input',
      'Tendency to steamroll quieter voices who have valuable perspectives',
      'Difficulty slowing down to celebrate progress along the way',
      'May undervalue relationships, trust-building, and group morale',
      'Can become controlling when not in charge of outcomes',
      'May alienate teammates by prioritizing results over people',
    ],
    communicationStyle:
      'You communicate with precision and purpose. You say what you mean, skip the small talk, and expect others to do the same. You prefer short, outcome-focused messages. You value confidence in others — tentative or overly apologetic communication frustrates you. You respond best when people lead with the bottom line rather than building up to it.',
    underStress:
      'Under stress, your directness can sharpen into bluntness, and your confidence can become controlling. You may become impatient, dismissive, or demanding. You might push too hard without considering morale or wellbeing of others. You may also take on too much solo because you feel others are too slow.',
    decisionStyle:
      'You decide fast, trust your instincts, and prefer being the one who calls the shot. You gather the most critical information quickly, make a judgment call, and course-correct if needed. You are more comfortable with imperfect action than perfect inaction.',
    teamworkStyle:
      'You perform best in roles with clear ownership and autonomy. You excel at driving projects forward and holding others accountable. You may clash with those who need more process or consensus. You are at your best when you can set the direction while others manage the details.',
    leadershipStyle:
      'You lead by example, set high expectations, and push others toward peak performance. You are direct about what you need and what is not working. You prefer leading through outcomes rather than through relationships. Your team respects your clarity but may sometimes feel the pressure of your standards.',
    conflictStyle:
      'You engage conflict head-on. You name the issue, state your position, and push for resolution fast. You are not afraid of confrontation — in fact, you prefer honesty over polite avoidance. You respect others who can stand their ground; you lose respect for people who avoid hard conversations.',
    bestEnvironment:
      'Fast-moving, results-oriented environments where decisions are made quickly. You thrive in competitive industries, leadership roles, entrepreneurial settings, and situations where your boldness is an asset rather than a liability.',
    howOthersShouldCommunicate: [
      'Be direct — skip the long preamble and lead with the point',
      'Show confidence — do not be overly apologetic or hesitant',
      'Come with solutions, not just problems',
      'Respect their time — be concise',
      'If disagreeing, state your position clearly with reasoning',
      'Avoid vague commitments — be specific about timelines and deliverables',
    ],
    growthTips: [
      'Practice active listening — pause before responding, especially in conflict',
      'Recognize that slowing down sometimes produces faster results',
      'Invest in relationship equity — people perform better when they feel valued, not just managed',
      'Notice the emotional temperature of a room, not just the task temperature',
      'Ask "what does this person need from me?" before launching into directives',
      'Celebrate incremental wins — they sustain long-term momentum',
    ],
    careerFit: [
      'Entrepreneur / Founder',
      'Executive Leadership (CEO, COO)',
      'Sales Director / Business Development',
      'Military / Emergency Response Leadership',
      'Project Management (high-stakes, fast-moving)',
      'Sports Coaching / Competitive Fields',
      'Crisis Management & Turnaround Consulting',
    ],
    relationshipTips: [
      'Tell people what they mean to you — they need to hear it',
      'Listen to understand, not just to formulate your next point',
      'Allow others to have their process even when it feels slow',
      'Notice when you are steamrolling and course-correct',
      'Show appreciation openly and specifically',
    ],
    warning:
      'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.',
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
    overview:
      'You are a natural connector and energizer. You think in possibilities, thrive in people-rich environments, and have a gift for making others feel excited, included, and inspired. People are drawn to your warmth, humor, and optimism. You communicate through stories, enthusiasm, and emotion — and you rarely struggle to get people on board. At your best, you transform reluctant rooms into motivated teams and inject creativity where others see only obstacles.',
    coreMotivation:
      'You are motivated by connection, recognition, and influence. You want to be liked, to inspire, and to make a meaningful impact through people. Being ignored, excluded, or undervalued drains you quickly. You are energized by collaboration, creative brainstorming, social interaction, and moments where you can bring your whole self to the table.',
    strengths: [
      'Naturally charismatic — people enjoy being around you',
      'Exceptional at motivating and rallying others',
      'Creative and idea-rich — you generate possibilities others don\'t see',
      'High emotional intelligence and social awareness',
      'Excellent networker and relationship builder',
      'Optimistic in the face of setbacks — you bounce back fast',
      'Skilled at persuasion and building buy-in',
    ],
    blindSpots: [
      'May overpromise and struggle to follow through on commitments',
      'Can talk more than you listen, missing important details',
      'May prioritize fun and connection over deadlines and discipline',
      'Difficulty delivering tough messages without softening them too much',
      'Can be disorganized or scattered when working solo',
      'May struggle with detailed, repetitive, or process-heavy work',
      'Approval-seeking behavior can dilute your honest opinions',
    ],
    communicationStyle:
      'You are an expressive, animated communicator who leads with emotion and story. You naturally use humor, vivid language, and enthusiasm to draw people in. You are persuasive and adaptive — you read the room well and adjust your tone. You thrive in verbal communication and can sometimes struggle with written, structured formats.',
    underStress:
      'Under stress, your expressiveness can become reactivity. You may become louder, more scattered, or emotionally volatile. You might seek validation from too many people, lose focus on what really matters, or vent in ways that create drama. You can also become superficial — avoiding real problems by staying relentlessly upbeat.',
    decisionStyle:
      'You decide through instinct and people-feel. You are drawn to choices that excite you or that others respond to enthusiastically. You trust your gut and your network. You can struggle to sit with analysis for long, and may jump to a decision before fully evaluating trade-offs.',
    teamworkStyle:
      'You are the person who keeps the team\'s energy high, fosters collaboration, and makes sure no one feels left behind socially. You are a natural bridge-builder and idea contributor. You excel in roles where communication and inspiration matter. You may need support on execution, detail management, and follow-through.',
    leadershipStyle:
      'You lead through inspiration and connection. You paint a vision, get people excited, and create cultures where people feel valued and heard. You prefer leading through enthusiasm and trust rather than structure and accountability. Teams love working for you — your challenge is maintaining discipline without losing warmth.',
    conflictStyle:
      'You dislike direct confrontation and prefer to resolve tension through warmth, humor, or finding common ground. You may avoid hard conversations or soften messages to the point where the real issue gets lost. When pushed, you can become emotional or personal in ways you later regret.',
    bestEnvironment:
      'Collaborative, creative, high-energy environments. You thrive in roles involving communication, people, ideas, and influence. Marketing, sales, culture-building, coaching, and public-facing work bring out your best.',
    howOthersShouldCommunicate: [
      'Start with connection — a warm opener goes a long way',
      'Be enthusiastic about ideas — match some of their energy',
      'Give them space to talk and express themselves fully',
      'Appreciate and acknowledge their contributions openly',
      'Avoid dry, overly formal, or purely analytical interactions',
      'When giving feedback, sandwich it with genuine positivity',
    ],
    growthTips: [
      'Practice finishing what you start before moving to the next exciting thing',
      'Develop your ability to sit with difficult, uncomfortable truths',
      'Build systems or partners that compensate for your follow-through gaps',
      'Listen more than you speak in key conversations — not everything needs your energy',
      'Deliver honest feedback even when it feels uncomfortable',
      'Channel your energy into depth as well as breadth',
    ],
    careerFit: [
      'Marketing & Brand Strategy',
      'Sales & Business Development',
      'Public Relations & Communications',
      'Training, Coaching & Facilitation',
      'Event Planning & Experience Design',
      'Content Creation & Media',
      'Talent Recruitment & Culture',
    ],
    relationshipTips: [
      'Follow through on what you say — reliability deepens trust',
      'Make space for quieter people — not everyone expresses love through words and energy',
      'Check in on others\' needs rather than assuming everyone wants social interaction',
      'Be honest even when the truth isn\'t fun to deliver',
      'Separate your need for approval from your genuine values',
    ],
    warning:
      'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.',
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
    overview:
      'You are the stabilizing force that groups need but rarely recognize. You lead with empathy, listen deeply, and create safety for others to be vulnerable and honest. You are consistent, dependable, and deeply committed to the people you care about. While others sprint, you build. While others debate, you ensure everyone is heard. At your best, you create the trust and cohesion that transform a group of individuals into a genuine team.',
    coreMotivation:
      'You are motivated by harmony, belonging, and making a meaningful difference in people\'s lives. You want your presence to matter — not through dominance or fame, but through real, enduring impact on the people around you. Conflict, rejection, and environments that feel unsafe or chaotic drain you. You are energized by close relationships, meaningful work, and environments where you feel genuinely valued.',
    strengths: [
      'Deep listening — people feel truly heard and understood around you',
      'Highly empathetic and emotionally attuned to others',
      'Loyal, reliable, and consistent — a rock for others',
      'Natural mediator who helps find peaceful resolutions',
      'Builds and maintains strong, trusting relationships',
      'Patient, steady, and calm under ordinary pressure',
      'Deeply caring and genuinely interested in others\' wellbeing',
    ],
    blindSpots: [
      'Difficulty saying no — can take on too much to please others',
      'Avoids necessary conflict, letting issues fester',
      'May suppress own needs to maintain harmony',
      'Can be perceived as passive or indecisive',
      'Resistance to change, especially sudden or externally imposed change',
      'May struggle with assertiveness in competitive environments',
      'Prone to burnout when giving too much without receiving support',
    ],
    communicationStyle:
      'You are a warm, attentive communicator who makes others feel safe to open up. You listen carefully, respond thoughtfully, and rarely interrupt. You prefer one-on-one or small group conversations over large group dynamics. Your language is considerate and often collaborative — you invite rather than declare.',
    underStress:
      'Under stress, you may withdraw and become unusually quiet, internalizing problems you should voice. You might become passive-aggressive, hinting at your frustration without naming it. You can also over-accommodate, saying yes to everything while quietly burning out. You may struggle to prioritize your own needs.',
    decisionStyle:
      'You prefer consensus-driven decisions where everyone has been considered. You are not a fast decider — you like to understand the full picture and the impact on people before committing. When forced to decide quickly, you may feel uncomfortable unless you trust the environment.',
    teamworkStyle:
      'You are the glue of a team — you create cohesion, remember people\'s preferences, and make sure no one gets left behind. You give credit generously and rarely seek the spotlight. You are most effective in stable, collaborative environments where relationships are valued alongside results.',
    leadershipStyle:
      'You lead through service. You create environments where people feel psychologically safe, trusted, and empowered. You are excellent at bringing out the best in individuals through genuine care and attention. Your challenge is maintaining authority and accountability without sacrificing your warmth.',
    conflictStyle:
      'You avoid conflict instinctively and prefer peaceful resolution over confrontation. When conflict arises, you mediate thoughtfully and look for solutions that honor everyone\'s perspective. You may struggle to advocate firmly for your own position and can give in even when you disagree.',
    bestEnvironment:
      'Stable, collaborative, people-focused environments. You thrive in roles where relationships, support, and steady progress matter. Healthcare, education, counseling, HR, community work, and team-support roles bring out your best qualities.',
    howOthersShouldCommunicate: [
      'Be patient and give them time to think and respond',
      'Show genuine appreciation for their contributions',
      'Create a safe space — avoid harshness or abrupt directness',
      'Ask for their opinion — they often hold back unless invited',
      'Give advance notice before introducing big changes',
      'Acknowledge the person, not just the task',
    ],
    growthTips: [
      'Practice setting clear boundaries — saying no is an act of self-respect',
      'Name your own needs out loud rather than waiting for others to notice',
      'Develop comfort with healthy, productive conflict — it is not the same as harm',
      'Push yourself to share honest opinions, especially when it matters',
      'Recognize your own burnout signals early and protect your energy',
      'Allow yourself to want recognition and ask for it when you deserve it',
    ],
    careerFit: [
      'Healthcare & Nursing',
      'Counseling & Social Work',
      'Human Resources & Organizational Development',
      'Education & Teaching',
      'Community Management & Nonprofits',
      'Customer Success & Support',
      'Project Coordination & Team Operations',
    ],
    relationshipTips: [
      'Voice your needs clearly rather than hoping they\'ll be noticed',
      'Allow people to support you — receiving care is also a skill',
      'Be honest about when something bothers you before it becomes resentment',
      'Balance your giving with intentional self-investment',
      'Recognize that healthy disagreement can deepen a relationship',
    ],
    warning:
      'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.',
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
    overview:
      'You are a rigorous, systematic thinker who values accuracy, quality, and evidence above speed or emotion. You notice details others miss, ask questions others overlook, and produce work of consistently high caliber. People rely on you to catch what could go wrong and to provide the kind of analysis that others simply cannot. At your best, you are the intellectual backbone of any endeavor — the person who makes sure the foundation is solid before the building goes up.',
    coreMotivation:
      'You are motivated by accuracy, mastery, and doing things right. You want your work to be correct and your reasoning to be sound. Rushing, guessing, or accepting "good enough" runs deeply against your nature. You are energized by complex problems, systems that make sense, and environments that reward thoughtfulness over speed.',
    strengths: [
      'Exceptional analytical ability and attention to detail',
      'High standards that elevate the quality of everything around you',
      'Systematic problem-solving — you think through issues thoroughly',
      'Calm, logical decision-making under intellectual pressure',
      'Strong planning and organizational capabilities',
      'Reliable and consistent — you deliver on what you commit to',
      'Deep expertise in your areas of focus',
    ],
    blindSpots: [
      'Analysis paralysis — can overthink and delay action',
      'Perceived as cold, critical, or unapproachable',
      'May struggle with ambiguity, improvisation, or rapid change',
      'Can be overly critical of others\' work and own mistakes',
      'Difficulty with "good enough" — perfectionism can slow progress',
      'May undervalue emotional and relational dimensions of work',
      'Can come across as dismissive if someone\'s reasoning doesn\'t hold up',
    ],
    communicationStyle:
      'You communicate with precision and care. You choose words deliberately, back up claims with evidence, and structure your thoughts logically before speaking. You ask clarifying questions rather than assuming. You prefer written communication where you can be precise. You can come across as reserved or overly formal, though you are simply being careful.',
    underStress:
      'Under stress, your precision can become hypercritical. You may become more withdrawn and harder to reach. You might fall into over-analysis, unable to make a move until you have perfect information. You may become visibly frustrated with those you see as careless or inconsistent. Your standards can feel like pressure to those around you.',
    decisionStyle:
      'You decide through deliberate analysis. You gather evidence, consider risks, build mental models, and verify assumptions before committing. You are at your best with adequate time to think. When forced into fast decisions, you may feel uncomfortable — but your instincts, when you trust them, are often well-calibrated.',
    teamworkStyle:
      'You are the quality guardian of a team. You catch errors, ask the hard questions, and ensure plans are actually sound. You work best with clear roles, high standards, and environments where your thoroughness is valued rather than treated as a bottleneck. You can be perceived as slow by faster-moving teammates, but your contributions prevent costly mistakes.',
    leadershipStyle:
      'You lead through expertise, preparation, and high standards. You create systems, set clear processes, and lead by example in quality. Your teams know exactly what is expected and why. Your challenge is connecting emotionally with team members and ensuring people feel appreciated, not just evaluated.',
    conflictStyle:
      'You prefer to resolve conflict through facts and logic. You want to establish what is actually true before drawing conclusions. You can appear cold or detached in conflict because you prioritize rational argument over emotional acknowledgment. Learning to validate feelings before presenting logic is a key growth area.',
    bestEnvironment:
      'Structured, quality-focused environments with clear expectations and the time to do things right. You thrive in research, engineering, finance, data, law, medicine, quality assurance, and any domain where accuracy is a professional requirement.',
    howOthersShouldCommunicate: [
      'Come prepared — have your facts and reasoning ready',
      'Be specific and precise — avoid vague or exaggerated statements',
      'Give them time to process before expecting a response',
      'Back up your claims with data or concrete examples',
      'Respect their standards rather than dismissing them as over-caution',
      'Don\'t rush them — quality thinking takes time',
    ],
    growthTips: [
      'Practice "good enough for now" — perfectionism has a cost in momentum',
      'Develop your emotional vocabulary to connect better with others',
      'Trust your analysis enough to act without 100% certainty',
      'Ask how others are feeling, not just what they are thinking',
      'Acknowledge effort and intent before critiquing execution',
      'Share your reasoning openly — people can\'t appreciate what they can\'t see',
    ],
    careerFit: [
      'Data Science & Analytics',
      'Software Engineering & Architecture',
      'Research & Academia',
      'Finance, Accounting & Audit',
      'Quality Assurance & Compliance',
      'Law & Regulatory Affairs',
      'Medicine & Clinical Sciences',
    ],
    relationshipTips: [
      'Show warmth actively — people need to feel valued, not just evaluated',
      'Lead with curiosity about people, not just about problems',
      'Express appreciation explicitly — don\'t assume people know you value them',
      'Allow for imperfection in others without withdrawing',
      'Open up about your own uncertainties — vulnerability builds trust',
    ],
    warning:
      'This is not a clinical psychological diagnosis. It is a self-reflection tool for communication awareness.',
  },
};
