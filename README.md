# Communication Selfmetric

A professional, scenario-based communication personality assessment built with **React, TypeScript, Tailwind CSS, and shadcn/ui**.

## Overview

This application asks users 32 original scenario-based questions to calculate their communication personality style based on four archetypes:

1. **Red / Driver** (Direct, decisive, outcomes-focused)
2. **Yellow / Influencer** (Social, expressive, people-focused)
3. **Green / Supporter** (Calm, patient, harmony-focused)
4. **Blue / Analyst** (Logical, careful, accuracy-focused)

## Features

- **32 Original Scenario Questions**: Covering decision-making, conflict, leadership, teamwork, stress response, etc.
- **Advanced Scoring Algorithm**: Calculates primary type, secondary type, confidence levels, and detects "blend" profiles (e.g., Red-Green).
- **Consistency Checking**: Includes reverse-style questions to detect adaptive communication patterns.
- **Detailed Result Reports**: Strengths, blind spots, how others should communicate with you, and career fit.
- **Shareable Results**: Encodes the result into the URL for easy sharing.
- **Modern UI**: Smooth animations, progressive disclosure, and responsive design.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **State Management**: React Context API
- **Persistence**: LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   This starts both:
   - React app on Vite
   - Express backend on `http://localhost:8787`

3. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

- `src/data/`: Contains the questions and personality type descriptions.
- `src/lib/`: Scoring algorithms and sharing utilities.
- `src/context/`: Global quiz state management.
- `src/components/`: Reusable UI components (QuestionCard, ResultSection, etc.).
- `src/pages/`: Main application pages (Home, Quiz, Result, Compare).
- `server/`: Express backend for AI suggestion generation.

## AI-Powered Personalized Suggestions

The personality type is always calculated by the quiz scoring algorithm in the frontend (`src/lib/quizScoring.ts`).
AI does **not** decide personality type. AI only generates suggestions based on the calculated result.

### Environment Variables

Create a `.env` file in the project root:

```bash
AI_PROVIDER=groq
AI_API_KEY=your_api_key_here
AI_MODEL=llama-3.1-8b-instant
PORT=8787
VITE_API_BASE_URL=
```

`VITE_API_BASE_URL` is optional. Leave it empty for same-origin `/api` calls.
If your Express backend is deployed separately, set it to your backend base URL.

Supported values for `AI_PROVIDER`:

- `groq`
- `gemini`
- `openrouter`

If `AI_MODEL` is not set, the backend uses a provider-specific default model.

### Backend Endpoint

`POST /api/ai-suggestions`

Request body:

```json
{
  "primaryType": "red",
  "secondaryType": "blue",
  "confidenceLevel": "high",
  "percentages": {
    "red": 42,
    "yellow": 18,
    "green": 20,
    "blue": 20
  },
  "userGoal": "career"
}
```

Response body:

```json
{
  "provider": "groq",
  "model": "llama-3.1-8b-instant",
  "suggestions": {
    "personalizedSummary": "",
    "communicationAdvice": [],
    "careerSuggestions": [],
    "relationshipAdvice": [],
    "stressManagementTips": [],
    "growthPlan": [],
    "threeActionsThisWeek": []
  }
}
```

### Safety Guardrails

The AI endpoint enforces strict prompt and response safeguards:

- No clinical or medical diagnosis claims
- No mental illness framing
- No extreme certainty claims
- Supportive, practical tone only
- Self-reflection disclaimer is always included

## Disclaimer

_This quiz is designed for self-reflection and communication awareness. It is not a clinical, medical, or psychological diagnosis._
