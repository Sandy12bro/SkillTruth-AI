# 🚀 SkillTruth AI

<div align="center">
  <h3>🎯 Your Resume Lies. We Prove It.</h3>
  <p><strong>An AI-powered truth engine that exposes fake skills and validates real expertise</strong></p>
  <p>⚡ Built with <em>absolute security</em> and <em>rigorous AI precision</em> ⚡</p>
</div>

---

## 🔥 What It Does

SkillTruth AI is a **brutally honest** resume verification platform that:

1. **🔍 Extract** - Rips apart PDF resumes using semantic AI analysis
2. **🤖 Interrogate** - Grills candidates with dynamic, technical AI interviews  
3. **📊 Verify** - Exposes the truth behind every claim on a stunning dashboard

> 💡 **Truth hurts, but lies hurt more.** We're here to separate the wheat from the chaff.

---

## 🛠️ Tech Arsenal

### Frontend Weapons
- **⚛️ React 18** - Modern hooks, zero compromises
- **⚡ Vite** - Lightning-fast development and builds
- **🎨 TailwindCSS v4** - Utility-first styling that slaps
- **🎭 Framer Motion** - Smooth animations that mesmerize
- **🔌 Axios** - HTTP requests that never fail
- **🧭 React Router** - Navigation that just works
- **✨ Lucide React** - Icons that make interfaces pop

### Backend Powerhouse
- **🟢 Node.js + Express** - Unstoppable server architecture
- **🍃 MongoDB + Mongoose** - Data persistence that scales
- **🔐 Firebase Admin** - Authentication that's ironclad
- **🎫 JWT** - Security tokens that can't be cracked
- **🧠 OpenAI API (gpt-4o-mini)** - AI that sees through bullshit
- **📄 pdf-parse** - PDF extraction that never misses
- **📤 Multer** - File uploads that handle anything
- **🌐 CORS** - Cross-origin freedom

### AI Intelligence
- **🤖 OpenAI SDK** - Seamless API integration
- **📋 Strict JSON** - No markdown, no excuses
- **🛡️ Error Handling** - Fallbacks that save the day
- **🎯 Prompt Engineering** - Context that hits the mark

---

## 📁 Project Structure

```bash
SkillTruth-AI/
├── 📱 client/                    # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   └── ui/           # Base UI components (Button, Card, etc.)
│   │   ├── pages/               # Page components (Upload, Analysis, Interview)
│   │   ├── context/             # React context for state management
│   │   ├── utils/               # Helper functions and utilities
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── public/                   # Static assets
│   └── package.json
├── 🖥️ server/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/          # Business logic handlers
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # External service integrations (OpenAI)
│   │   ├── middleware/          # Custom middleware
│   │   ├── utils/               # Utility functions
│   │   └── index.js             # Server entry point
│   └── package.json
├── 🔧 .env                         # Environment variables (KEEP SECRET!)
├── 🚫 .gitignore
├── 📖 README.md
└── 📜 LICENSE
```

---

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** (v16+) - The engine that powers everything
- **MongoDB** - Where the truth gets stored
- **Firebase** project - For authentication that can't be fooled
- **OpenAI API key** - The AI brain that sees all

### ⚡ Installation

<details>
<summary>🎯 Click to expand installation steps</summary>

#### 1️⃣ Clone This Truth Machine
```bash
git clone https://github.com/Sandy12bro/SkillTruth-AI.git
cd "SkillTruth AI"
```

#### 2️⃣ Fire Up The Backend
```bash
cd server
npm install
```

#### 3️⃣ Configure The Secrets
Create a `.env` file with these keys:
```env
🔧 PORT=5000
🔧 NODE_ENV=development
🔧 MONGODB_URI=mongodb://localhost:27017/skilltruth-ai
🔧 JWT_SECRET=your_jwt_secret_key_here
🔧 JWT_EXPIRE=7d
🔧 OPENAI_API_KEY=sk-proj-your_openai_api_key_here
🔧 OPENAI_MODEL=gpt-4o-mini
🔧 FIREBASE_PROJECT_ID=your_firebase_project_id
🔧 FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_firebase_private_key_here\n-----END PRIVATE KEY-----\n"
🔧 FIREBASE_CLIENT_EMAIL=your_firebase_client_email
🔧 FIREBASE_CLIENT_ID=your_firebase_client_id
🔧 FRONTEND_URL=http://localhost:5174
```

#### 4️⃣ Launch The Backend
```bash
node src/index.js
```

#### 5️⃣ Power Up The Frontend
```bash
cd client
npm install
npm run dev
```

#### 6️⃣ Face The Truth
Open `http://localhost:5174` and upload a resume to see the magic ✨

</details>

---

## 🎮 Environment Variables

| Variable | What It Does | Default | Required? |
|----------|---------------|----------|-----------|
| `PORT` | Server port number | 5000 | 🚫 No |
| `NODE_ENV` | Development mode | development | 🚫 No |
| `MONGODB_URI` | Database connection | mongodb://localhost:27017/skilltruth-ai | ✅ Yes |
| `JWT_SECRET` | Security token secret | - | ✅ Yes |
| `JWT_EXPIRE` | Token expiration | 7d | 🚫 No |
| `OPENAI_API_KEY` | AI brain access | - | ✅ Yes |
| `OPENAI_MODEL` | AI model to use | gpt-4o-mini | 🚫 No |
| `FIREBASE_PROJECT_ID` | Firebase project | - | ✅ Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase auth key | - | ✅ Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase email | - | ✅ Yes |
| `FRONTEND_URL` | Frontend URL | http://localhost:5174 | 🚫 No |

---

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/verify` - Token verification

### 📄 Resume Processing
- `POST /api/resume/upload` - Upload and parse PDF resume
- `POST /api/resume/analyze` - **AI analysis of resume text**
- `GET /api/resume/:id` - Get resume analysis results
- `GET /api/resume/user/:userId` - Get user resumes

### 🤖 Interview System
- `POST /api/interview/start` - **Start AI interrogation**
- `POST /api/interview/chat` - Send message to AI interviewer
- `GET /api/interview/:id` - Get interview session details

### 📊 Results & Analytics
- `GET /api/results/:interviewId` - Get interview results and skill verification
- `GET /api/results/user/:userId` - Get user's interview history

---

## 🎯 Recent Truth-Enhancing Updates

### 🔥 Critical AI Fixes
- **📋 Strict JSON Formatting** - No more markdown excuses, just pure data
- **🛡️ Enhanced Error Handling** - Fallbacks that catch everything
- **🔍 Debug Logging** - See exactly what the AI is thinking
- **✅ Data Validation** - Structure that can't be broken

### 🎨 Frontend Truth Serum
- **🌊 Flow State Management** - Data flows like water
- **🚨 Error Boundaries** - Problems get caught, not hidden
- **⏳ Loading States** - Users never wonder what's happening
- **📱 Responsive Design** - Looks perfect on every device

### 🖥️ Backend Muscle
- **📄 PDF Processing** - Text extraction that never fails
- **🧠 OpenAI Integration** - Prompts engineered for maximum truth
- **🔒 Security** - Input validation that blocks attacks
- **⚡ Performance** - Responses faster than a lie detector

---

## 🎮 Development Workflow

### 🚀 Running The Truth Machine
1. **🍃 Start MongoDB** - The database of truth
2. **🔧 Configure `.env`** - Set your secrets
3. **🖥️ Start Backend** - `cd server && node src/index.js`
4. **📱 Start Frontend** - `cd client && npm run dev`
5. **🌐 Open Browser** - `http://localhost:5174`

### 🔍 Debugging Mode
- **🖥️ Backend Logs** - See AI processing in real-time
- **🌐 Browser Console** - Track data flow and state changes
- **📡 Network Tab** - Monitor API requests and responses
- **🛠️ Dev Tools** - Real-time debugging superpowers

### 🧪 Testing The Pipeline
1. **📤 Upload Resume** - Test PDF parsing
2. **🧠 Check AI Response** - Verify structured data
3. **📊 Navigate Analysis** - Test data visualization
4. **🤖 Try Interview** - Test AI interrogation
5. **🚨 Monitor Errors** - Ensure fallbacks work

---

## 🤝️ Contributing

1. **🍴 Fork** - Make it your own
2. **🌿 Create Branch** - `git checkout -b feature/amazing-truth`
3. **💾 Commit Changes** - `git commit -m 'Add truth serum'`
4. **📤 Push Branch** - `git push origin feature/amazing-truth`
5. **🔄 Pull Request** - Let us review your truth

### 📜 Development Guidelines
- **🎨 Follow existing style** - Consistency is truth
- **🛡️ Add error handling** - Never let users see crashes
- **🧪 Test everything** - Broken features spread lies
- **📖 Update docs** - Documentation is truth
- **💬 Meaningful commits** - History should tell a story

---

## 🚨 Troubleshooting

### 😈 Common Issues
- **🤖 AI Response Errors** - Check OpenAI key and model access
- **📄 PDF Parsing Issues** - Ensure PDFs are text, not images
- **🌐 CORS Errors** - Verify FRONTEND_URL in `.env`
- **🍃 MongoDB Connection** - Check connection string and database

### 🔧 Debug Steps
1. **🖥️ Check Backend Logs** - Errors don't hide here
2. **🔧 Verify Environment** - All variables properly set?
3. **🧪 Test API Directly** - Use Postman or curl
4. **🌐 Check Browser Console** - Frontend errors revealed
5. **📡 Monitor Network** - Request/response analysis

---

## 📜 License

This project is licensed under **ISC License** - see the [LICENSE](LICENSE) file for details.

> ⚖️ **Legal truth:** Use it, modify it, but keep the attribution.

---

## 📞 Contact

For questions, support, or truth-related emergencies:

🔗 **Open an Issue** on GitHub - We'll respond faster than AI analysis

---

<div align="center">

## 🎯 Ready to Separate Truth from Fiction?

<details>
<summary>🚀 Click for the ultimate truth experience</summary>

### ⚡ Quick Test
1. **📤 Upload any resume** - PDF format preferred
2. **🧠 Watch the AI work** - Real-time processing
3. **📊 See the results** - Skills, projects, strengths, weaknesses
4. **🤖 Start interview** - Put those skills to the test
5. **🎯 Get the truth** - No more fake claims

### 🔥 What You'll Discover
- **✅ Real skill levels** - Not just buzzwords
- **📊 Project complexity** - Actual technical depth
- **🎯 Strengths & weaknesses** - Honest assessment
- **🤖 AI verification** - Claims get tested
- **📈 Progress tracking** - See improvement over time

> 💡 **Remember:** The truth may hurt, but it's better than living a lie.

</details>

---

<div align="center">
  <p><strong>⚡ Built with absolute security and rigorous AI precision ⚡</strong></p>
  <p><em>Because in a world of fake skills, truth is the ultimate competitive advantage.</em></p>
</div>

---

<div align="center">
  <p>⭐ If this project helped you expose some lies, give it a star! ⭐</p>
  <p>🔗 <a href="https://github.com/Sandy12bro/SkillTruth-AI">View on GitHub</a></p>
</div>