# SkillTruth AI

Your Resume Lies. We Prove It. An AI-powered truth engine constructed to validate and interrogate tech candidate skills natively through an automated pipeline.

## 🚀 Overview

SkillTruth AI relies on an advanced MERN-stack architecture mapping seamlessly to direct OpenAI connections to:
1. **Extract**: Parses PDF Resumes into JSON utilizing semantic context grouping.
2. **Interrogate**: Engages candidates in a dynamic, chat-based technical and behavioral AI interview.
3. **Verify**: Plots integrity and skill depth on a beautiful glassmorphism React dashboard.

## ⚙️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS v4, Framer Motion, Recharts
- **Backend**: Node.js, Express, Multer (Memory Storage)
- **AI Integration**: OpenAI SDK (`gpt-4` tier mapping)
- **Database**: MongoDB (Mongoose Schema Architecture Ready)

## 📦 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-link>
   cd "SkillTruth AI"
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   **Important Environment Variable Configuration:**
   Place a `.env` file at the root repository mapping the following keys:
   ```env
   PORT=5000
   OPENAI_API_KEY=sk-proj-...
   OPENAI_MODEL=gpt-4o-mini
   FRONTEND_URL=http://localhost:5173
   ```
   Run the backend:
   ```bash
   node src/index.js
   ```

3. **Frontend Setup**
   Open a new terminal.
   ```bash
   cd client
   npm install
   ```
   Run the frontend application:
   ```bash
   npm run dev
   ```

4. **Launch the Core Pipeline**
   Navigate to `http://localhost:5173/`. 
   Click **Upload Resume**, select a PDF, and the full UI simulation will fire synchronously.

---
*Built with absolute security and rigorous AI precision.*
