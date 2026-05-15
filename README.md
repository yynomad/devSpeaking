# AI Engineer English Trainer

Minimal Day 1 MVP: Next.js frontend → Go backend → OpenAI Chat Completions API (or mock when no key exists) → response displayed.

## Run the backend

```bash
cd backend
OPENAI_API_KEY=your_key_here go run .
```

If `OPENAI_API_KEY` is not set, the backend returns a mock coaching response.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 and submit a phrase such as `高并发`.

## Configuration

- Backend listens on `:8080` by default. Override with `PORT`.
- Frontend posts to `http://localhost:8080/api/chat` by default. Override with `NEXT_PUBLIC_API_URL`.
- Backend uses `gpt-4o-mini` by default. Override with `OPENAI_MODEL`.
