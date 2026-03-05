# FutureMe AI – Personal Life Projection Simulator

FutureMe AI is an interactive, futuristic platform that predicts your 3-year life trajectory based on your current habits. It uses a combination of rule-based scoring models and AI-driven insights to project Health Risk, Financial Stability, Career Growth, and Burnout Probability.

This project was built as a full-stack web application designed to WOW users at hackathons with its emotional impact and visual dashboard.

## Features

- **Personalized Life Data Input**: Collects 10+ metrics (sleep, stress, debt, savings, diet, etc.).
- **Hybrid Projection Engine**: Fast rule-based baseline scores coupled with deep AI qualitative analysis.
- **Futuristic AI Dashboard**: Circular SVG animated meters, interactive trend graphs, and stability indexing.
- **Scenario Comparison**: Instantly see how small habit changes (like sleeping more or reducing stress) compound over 3 years.
- **Emotional "Letter from Future You"**: An AI-generated, personalized reflection from 3 years in the future to drive behavioral change.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion, Chart.js
- **Backend**: Node.js, Express, dotenv
- **AI Integration**: OpenAI API (gpt-3.5-turbo with JSON object mode)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Your own OpenAI API Key

### 1. Setup Backend
\`\`\`bash
cd backend
npm install
\`\`\`
- Edit \`backend/.env\` and add your \`OPENAI_API_KEY\`.
- Start the server:
\`\`\`bash
npm run dev
# OR
node server.js
\`\`\`
Server runs on \`http://localhost:5000\`.

### 2. Setup Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Frontend runs on \`http://localhost:5173\`.

## Deployment Guide

### Backend (Render)
1. Push your code to GitHub.
2. Go to Render.com -> New Web Service.
3. Select the repository. Set the Root Directory to \`backend\`.
4. Build Command: \`npm install\`
5. Start Command: \`node server.js\`
6. Add Environment Variables (e.g., \`OPENAI_API_KEY\`).
7. Deploy.

### Frontend (Vercel or Netlify)
1. Go to Vercel/Netlify -> New Project.
2. Select your repository. Set Root Directory to \`frontend\`.
3. Framework Preset: Vite.
4. Build Command: \`npm run build\`
5. Add the backend URL to your frontend API fetch request (\`App.jsx\`) instead of localhost.
6. Deploy.

## Demo Flow

Enter data representing a high-stress "hustle culture" worker. Show the current path (High burnout, mixed career). Then click "Improved Habits ✨" to instantly show the transformation and emotional impact of "The Letter from Future You".
