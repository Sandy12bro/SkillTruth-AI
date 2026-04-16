# SkillTruth AI

Your Resume Lies. We Prove It. An AI-powered truth engine constructed to validate and interrogate tech candidate skills natively through an automated pipeline.

## Overview

SkillTruth AI relies on an advanced MERN-stack architecture mapping seamlessly to direct OpenAI connections to:
1. **Extract**: Parses PDF Resumes into JSON utilizing semantic context grouping
2. **Interrogate**: Engages candidates in a dynamic, chat-based technical and behavioral AI interview
3. **Verify**: Plots integrity and skill depth on a beautiful glassmorphism React dashboard

## Features

### Core Functionality
- **Resume Parsing**: Advanced PDF to JSON conversion with semantic analysis
- **AI-Powered Interviews**: Dynamic, context-aware technical interviews
- **Skill Verification**: Real-time skill assessment and validation
- **Analytics Dashboard**: Visual representation of candidate capabilities
- **Secure Authentication**: JWT-based user authentication system
- **Responsive Design**: Mobile-friendly glassmorphism UI

### Technical Highlights
- **Real-time Processing**: Fast and efficient skill assessment
- **Firebase Integration**: Secure authentication and data storage
- **Strict JSON Parsing**: Robust error handling for AI responses
- **Debug Logging**: Comprehensive tracking throughout the pipeline
- **Flow State Management**: Seamless data flow between components

## Tech Stack

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **TailwindCSS v4** for utility-first styling
- **Framer Motion** for smooth animations
- **Axios** for API requests
- **React Router** for navigation
- **Lucide React** for beautiful icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Firebase Admin SDK** for authentication
- **JWT** for secure authentication
- **OpenAI API** (`gpt-4o-mini`) for AI-powered analysis
- **pdf-parse** for PDF text extraction
- **Multer** for file uploads
- **CORS** for cross-origin requests

### AI Integration
- **OpenAI SDK** for seamless API integration
- **Strict JSON response formatting**
- **Robust error handling and fallback mechanisms**
- **Context-aware prompt engineering**

## Project Structure

```
SkillTruth-AI/
|-- client/                 # React frontend application
|   |-- src/
|   |   |-- components/     # Reusable UI components
|   |   |   |-- ui/         # Base UI components (Button, Card, etc.)
|   |   |-- pages/          # Page components (Upload, Analysis, Interview)
|   |   |-- context/        # React context for state management
|   |   |-- utils/          # Helper functions and utilities
|   |   |-- App.jsx         # Main app component
|   |   |-- main.jsx        # Entry point
|   |-- public/             # Static assets
|   |-- package.json
|   |-- vite.config.js
|   |-- tailwind.config.js
|-- server/                 # Node.js backend
|   |-- src/
|   |   |-- controllers/    # Business logic handlers
|   |   |-- routes/         # API route definitions
|   |   |-- services/       # External service integrations (OpenAI)
|   |   |-- middleware/     # Custom middleware
|   |   |-- utils/          # Utility functions
|   |   |-- index.js        # Server entry point
|   |-- package.json
|-- .env                    # Environment variables
|-- .gitignore
|-- README.md
|-- LICENSE
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Firebase project with service account credentials
- OpenAI API key with access to GPT-4 models

### Installation

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
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/skilltruth-ai
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   OPENAI_API_KEY=sk-proj-your_openai_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_firebase_private_key_here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_CLIENT_ID=your_firebase_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FRONTEND_URL=http://localhost:5174
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
   Navigate to `http://localhost:5174/`. 
   Click **Upload Resume**, select a PDF, and the full UI simulation will fire synchronously.

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment | development | No |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/skilltruth-ai | Yes |
| `JWT_SECRET` | JWT secret key | - | Yes |
| `JWT_EXPIRE` | JWT expiration time | 7d | No |
| `OPENAI_API_KEY` | OpenAI API key | - | Yes |
| `OPENAI_MODEL` | OpenAI model to use | gpt-4o-mini | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | - | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | - | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | - | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5174 | No |

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify` - Token verification

### Resume Processing
- `POST /api/resume/upload` - Upload and parse PDF resume
- `POST /api/resume/analyze` - Analyze resume text with AI
- `GET /api/resume/:id` - Get resume analysis results
- `GET /api/resume/user/:userId` - Get user resumes

### Interview System
- `POST /api/interview/start` - Initiate AI interview session
- `POST /api/interview/chat` - Send message to AI interviewer
- `GET /api/interview/:id` - Get interview session details

### Results & Analytics
- `GET /api/results/:interviewId` - Get interview results and skill verification
- `GET /api/results/user/:userId` - Get user's interview history

## Recent Updates & Fixes

### Critical AI Response Fixes
- **Strict JSON Formatting**: Implemented robust JSON parsing with markdown removal
- **Enhanced Error Handling**: Added comprehensive error logging and fallback mechanisms
- **Debug Logging**: Added detailed logging throughout the pipeline for troubleshooting
- **Data Validation**: Implemented strict validation for AI response structure

### Frontend Improvements
- **Flow State Management**: Enhanced data flow between components
- **Error Boundaries**: Better error handling and user feedback
- **Loading States**: Improved UX with proper loading indicators
- **Responsive Design**: Mobile-friendly interface with glassmorphism effects

### Backend Enhancements
- **PDF Processing**: Improved text extraction and validation
- **OpenAI Integration**: Optimized prompt engineering for better results
- **Security**: Enhanced input validation and sanitization
- **Performance**: Optimized response times and error handling

## Development Workflow

### Running the Application
1. Start MongoDB server
2. Configure environment variables in `.env`
3. Start backend server: `cd server && node src/index.js`
4. Start frontend dev server: `cd client && npm run dev`
5. Open `http://localhost:5174` in your browser

### Debugging
- Backend logs show detailed AI response processing
- Frontend console logs track data flow and state changes
- Network tab shows API requests and responses
- Use browser dev tools for real-time debugging

### Testing the Pipeline
1. Upload a PDF resume
2. Check console logs for AI response processing
3. Verify structured data parsing
4. Navigate through analysis and interview flows
5. Monitor error handling and fallback mechanisms

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and structure
- Add proper error handling and logging
- Test all functionality before submitting PRs
- Update documentation for new features
- Use meaningful commit messages

## Troubleshooting

### Common Issues
- **AI Response Errors**: Check OpenAI API key and model availability
- **PDF Parsing Issues**: Ensure PDFs are text-based and not scanned images
- **CORS Errors**: Verify FRONTEND_URL in environment variables
- **MongoDB Connection**: Check connection string and database availability

### Debug Steps
1. Check backend terminal logs for errors
2. Verify environment variables are properly set
3. Test API endpoints directly with tools like Postman
4. Check browser console for frontend errors
5. Monitor network requests and responses

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please open an issue on GitHub.

---

*Built with absolute security and rigorous AI precision.*