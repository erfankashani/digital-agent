# Twin — Project Overview

Personal site for Erfan Kashani, anchored by a "Digital Twin" chatbot. The current state is a working chat surface; the next phase is a full-fledged frontend with a hero page, resume, portfolio, and blog sections, all wrapped around the existing twin chat.

## Layout

```
twin/
├── frontend/   Next.js 16 + React 19 + Tailwind v4 (static export)
├── backend/    FastAPI chat API, AWS Bedrock, deployed to AWS Lambda
└── memory/     Local conversation storage (JSON per session_id)
```

## Frontend — `frontend/`

- **Stack**: Next.js `16.2.6` (App Router), React `19.2.4`, Tailwind v4 (`@tailwindcss/postcss`), TypeScript, `lucide-react` icons.
- **Build mode**: static export (`output: 'export'` in `next.config.ts`, `images.unoptimized: true`). Output lands in `out/` and is suitable for static hosting (e.g. S3 + CloudFront).
- **Routes**: single page at `app/page.tsx` — a centered container with title "AI Agents in Production" and the `<Twin />` chat component.
- **Components**:
  - `components/twin.tsx` — client component, chat UI with message list, input, loading dots, and session persistence via `session_id` returned by the API. Backend URL is **hardcoded** to the deployed Lambda API Gateway endpoint (`https://8g72jelcri.execute-api.us-east-2.amazonaws.com/chat`).
- **Styling**: Tailwind classes inline, slate/gray palette; one custom `bounce` keyframe in `app/globals.css`.
- **Important**: This Next.js version has breaking changes vs. training data. See `frontend/AGENTS.md` — consult `node_modules/next/dist/docs/` before changing routing, config, or build behavior.

## Backend — `backend/`

- **Stack**: FastAPI + Pydantic, `boto3` for AWS Bedrock and S3, deployed via `lambda_handler.py` to AWS Lambda (`deploy.py`, `lambda-deployment.zip`).
- **Model**: AWS Bedrock Converse API. Default `BEDROCK_MODEL_ID = global.amazon.nova-2-lite-v1:0` (env-overridable).
- **Endpoints**:
  - `GET /` — service info
  - `GET /health` — health check
  - `POST /chat` — `{message, session_id?}` → `{response, session_id}`; creates `session_id` on first call.
  - `GET /conversation/{session_id}` — full history
- **Persona**: `context.py` builds the system prompt by interpolating `resources.py` (LinkedIn, summary, facts, style) — the assistant speaks as Erfan's digital twin with anti-jailbreak rules.
- **Memory**: per-session JSON. Local file in `MEMORY_DIR` (default `../memory/`) or S3 (`USE_S3=true`, `S3_BUCKET=...`). Last 50 messages of history are sent each turn.
- **CORS**: `CORS_ORIGINS` env var (comma-separated), defaults to `http://localhost:3000`.

## Local dev

- Frontend: `npm run dev` in `frontend/` (Next dev server).
- Backend: `python server.py` in `backend/` (uvicorn on `:8000`). Requires AWS creds with Bedrock access and a `.env` for `BEDROCK_MODEL_ID`, `DEFAULT_AWS_REGION`, `USE_S3`, `S3_BUCKET`, `CORS_ORIGINS`.

## Deployment

- Backend → AWS Lambda behind API Gateway (`8g72jelcri.execute-api.us-east-2.amazonaws.com`), conversation memory in S3.
- Frontend → static export from `out/`; the chat URL is baked into the bundle today, so any backend URL change requires a frontend rebuild.

## Roadmap (next)

Build out a real personal site around the chat:
- Hero landing page (intro, CTA into chat).
- Resume / experience section.
- Portfolio / projects section.
- Blog (likely MDX or a headless source — TBD).
- Navigation + shared layout across sections.

When implementing, keep the static export constraint in mind (no server runtime — anything dynamic must call the existing API or another static-friendly source).
