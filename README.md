# AgriPredict UI

Smart Agriculture multi-service AI interface built with React + Vite + Tailwind and a lightweight Express backend for the chatbot API.

## Features
- AI services hub (crop recommendation embed, yield, disease, fertilizer, weather, rainfall)
- Multilingual (English/Hindi)
- Micro-interactions (skeleton shimmer, ripple, hover lift, animated gradients)
- Chatbot assistant via `/api/chat`
- Toast notifications with undo patterns
- Responsive, glass & gradient design
- SPA served statically after build + Node API

## Local Development
```bash
npm install
npm run dev:all   # starts Vite (5173) + API server (8080 after patch? server uses 8080 when built)
```
Or run separately:
```bash
npm run dev       # frontend only (port 5173)
npm run api       # backend only (port 8080)
```
Chatbot fetches `/api/chat` (proxy is only needed in dev when ports differ; in production they are unified).
On Vercel deployment, the same path `/api/chat` is served by a serverless function (see `api/chat.js`).

## Build & Production Run
```bash
npm run build        # builds frontend into /dist
npm start            # serves dist + API on PORT (default 8080)
```
Set a custom port:
```bash
PORT=3000 npm start
```
(Windows PowerShell)
```powershell
$env:PORT=3000; npm start
```
Then visit http://localhost:3000

## Deployment Targets
### 1. Render / Railway / Cyclic (Node + static)
- Create a new Web Service from repo
- Build command: `npm run build`
- Start command: `npm start`
- Ensure Node version (Render env var `NODE_VERSION`) if needed

### 2. Docker (recommended reproducibility)
Create `Dockerfile`:
```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.js ./
EXPOSE 8080
CMD ["node","server.js"]
```
Build & run:
```bash
docker build -t agripredict .
docker run -p 8080:8080 agripredict
```

### 3. Vercel (Static + Serverless API)
Already configured:
- `vercel.json` sets build to `npm run build` output `dist`
- Functions in `/api` (`chat.js`, `health.js`)
Deploy steps:
1. Install CLI: `npm i -g vercel`
2. Run `vercel` (link project, accept detected settings)
3. Run `vercel --prod` for production deployment

Environment overrides (optional): add `VITE_API_BASE` if pointing to external API.

### Netlify (Alternative)
- Move functions into `netlify/functions/*`
- Use `netlify.toml` with build command `npm run build` & publish `dist`

### 4. Azure / AWS Elastic Beanstalk / GCP App Engine
- Use same build then start commands
- Add a health check path `/api/health`

## Environment Variable (future expansion)
- `PORT` (server port)
- (Planned) `API_KEYS_*` for external integrations
- (Optional) `VITE_API_BASE` to override API origin in frontend

## Modifying Fetch Base URL
Update fetch in `src/components/Chatbot.jsx`:
```js
const base = import.meta.env.VITE_API_BASE || '';
fetch(base + '/api/chat', ...)
```

## Security TODO
- Rate limiting for `/api/chat`
- Input validation library
- Helmet headers
- Auth (JWT / session) when accounts added

## Roadmap Snapshot
See PPT bullets in earlier summary (features & roadmap sections)

## License
Proprietary (adjust as needed)
