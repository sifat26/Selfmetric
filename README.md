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

## Disclaimer
*This quiz is designed for self-reflection and communication awareness. It is not a clinical, medical, or psychological diagnosis.*
