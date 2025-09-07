import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// --- Chat FAQ logic (placeholder for future ML) ---
const FAQ = [
  { q: /rain|weather/i, a: 'Weather: 5-day forecast integration planned. Meanwhile use the Weather service panel.' },
  { q: /fertilizer|nutrient/i, a: 'Fertilizer: Provide recent N-P-K and pH to refine balancing suggestions.' },
  { q: /disease|pest/i, a: 'Disease: Moisture + temperature + crop stage influence risk scoring.' },
  { q: /yield/i, a: 'Yield: Historical yield + soil chemistry + forecast alignment determine estimate bands.' }
];

function answerQuery(text) {
  for (const f of FAQ) { if (f.q.test(text)) return f.a; }
  return 'I will learn this soon. Ask about yield, weather, disease or fertilizer for now.';
}

// --- API Routes ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: Date.now() });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string') return res.status(400).json({ error: 'message required' });
  const reply = answerQuery(message);
  res.json({ reply, ts: Date.now() });
});

// --- Static Frontend (served after build) ---
const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));

// Fallback to index.html for SPA routes (exclude API paths)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(distDir, 'index.html'));
});

const PORT = process.env.PORT || 8080; // Production-friendly default
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
