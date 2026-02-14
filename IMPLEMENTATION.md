# Implementation Guide

## Tech Stack
- **Backend**: NestJS + TypeScript
- **Frontend**: React + TypeScript + Vite
- **HTTP**: Axios (both sides)

## How to Run

### Backend
```bash
cd backend
npm install
npm run start:dev
# http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### Usage
- Visit `http://localhost:5173` — post list
- Click a post to view it with the embedded BB video
- Add `?user=3` to the URL to enable watch tracking
- Watch past 40% or finish the video — tracking logs appear in console

## Project Structure

```
backend/src/
  modules/
    mapping/    → reads CSV, maps postId → mediaclipId
    posts/      → fetches post from JSONPlaceholder, enriches with mediaclipId
    users/      → fetches user info, sends watch tracking via PATCH

frontend/src/
  pages/PostPage/       → displays post, author, video player
  components/VideoPlayer/ → embeds BB player, manages lifecycle
  hooks/useUser.ts      → identifies user (?user=123 or localStorage)
  hooks/useVideoTracking.ts → tracks 40% watched + completion
  services/api.ts       → axios client for backend API
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/posts/ | all posts |
| GET | /api/posts/:id | Post + mediaclipId |
| GET | /api/users/:id | User details |
| PATCH | /api/users/:id | Update watch data |

## What I Would Do With More Time
- Unit and integration tests
- Docker setup for one command startup
- shared types between frontend and backend (monorepo)
- Persistent watch tracking (database instead of JSONPlaceholder)
- E2E tests with Playwright
- CI/CD pipeline
