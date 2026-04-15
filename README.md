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
   git clone https://github.com/Sandy12bro/SkillTruth-AI.git
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

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Resume Processing
- `POST /api/resume/upload` - Upload and parse PDF resume
- `GET /api/resume/:id` - Get resume analysis results

### Interview System
- `POST /api/interview/start` - Initiate AI interview session
- `POST /api/interview/chat` - Send message to AI interviewer
- `GET /api/interview/:id` - Get interview session details

### Results & Analytics
- `GET /api/results/:interviewId` - Get interview results and skill verification
- `GET /api/results/user/:userId` - Get user's interview history

## Project Structure

```
SkillTruth-AI/
|-- client/                 # React frontend application
|   |-- src/
|   |   |-- components/     # Reusable UI components
|   |   |-- pages/          # Page components
|   |   |-- utils/          # Helper functions
|   |   |-- App.jsx         # Main app component
|   |-- package.json
|   |-- vite.config.js
|-- server/                 # Node.js backend
|   |-- src/
|   |   |-- routes/         # API route handlers
|   |   |-- controllers/    # Business logic
|   |   |-- middleware/     # Custom middleware
|   |   |-- utils/          # Utility functions
|   |   |-- index.js        # Server entry point
|   |-- package.json
|-- .env                    # Environment variables
|-- .gitignore
|-- README.md
|-- LICENSE
```

## Features

- **Resume Parsing**: Advanced PDF to JSON conversion with semantic analysis
- **AI Interviews**: Dynamic, context-aware technical interviews
- **Skill Verification**: Real-time skill assessment and validation
- **Analytics Dashboard**: Visual representation of candidate capabilities
- **Secure Authentication**: JWT-based user authentication system
- **Responsive Design**: Mobile-friendly glassmorphism UI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---
*Built with absolute security and rigorous AI precision.*
