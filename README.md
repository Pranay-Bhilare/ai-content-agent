# AI Content Agent

A modern, AI powered full-stack Next.js application for analyzing and enhancing YouTube videos with AI. Submit a YouTube URL to ask any questions related to the video, AI-generated titles, thumbnails, full transcriptions by an interactive AI AGENT for EVERYTHING.

## Features
- **YouTube Video Analysis:** Fetches and allows you to ask any question about the video indexed.
- **AI Title Generation:** Suggests multiple engaging titles for your video.
- **AI Thumbnail Generation:** Creates unique, AI-generated thumbnails.
- **Full Transcription:** Retrieves and displays the complete transcript of the video.
- **AI Chat Assistant:** Ask questions, generate scripts, titles, and thumbnails via an AI-powered chat.
- **Modern UI:** Animated, responsive design with 3D backgrounds and smooth transitions.
- **Authentication:** Secure user authentication with Clerk.
- **Backend:** Uses Convex for real-time backend/database operations.

## Tech Stack
- **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Three.js
- **Backend:** Convex, Next.js API routes, AI SDKs
- **Auth:** Clerk
- **AI Integrations:** OpenAI, Google, Luma, and more via SDKs
- **YouTube Data:** Multiple transcript and video info libraries

## Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment variables
Create a `.env.local` file in the root with your API keys and credentials (YouTube, Clerk, Convex, etc.). Example:
```
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT=your_convex_url
YOUTUBE_API_KEY=your_youtube_api_key
# ...other keys as needed
```

### 3. Run the development server
```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Usage
1. **Enter a YouTube URL** on the homepage.
2. **Get redirected** to the analysis dashboard for that video.
3. **Explore:**
   - Ask any question to the agent about the video
   - Video details and stats
   - AI-generated titles and thumbnails
   - Full transcript
   - Chat with the AI AGENT for scripts, ideas, and more
   - Leverage the AI AGENT which has access to many tools.

## Scripts
- `pnpm dev` – Start development server
- `pnpm build` – Build for production
- `pnpm start` – Start production server
- `pnpm lint` – Lint code

## Customization
- **Components:** `/components`
- **Backend/DB Logic:** `/actions`, `/convex`
- **Utilities:** `/lib`
- **Types:** `/types`

---

**AI Content Agent** – Analyze, ideate, and enhance your YouTube content with the power of AI AGENT.
