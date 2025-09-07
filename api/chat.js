// Vercel Serverless Function: /api/chat
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'message required' });
    const FAQ = [
      { q: /rain|weather/i, a: 'Weather: 5-day forecast integration planned. Meanwhile use the Weather service panel.' },
      { q: /fertilizer|nutrient/i, a: 'Fertilizer: Provide recent N-P-K and pH to refine balancing suggestions.' },
      { q: /disease|pest/i, a: 'Disease: Moisture + temperature + crop stage influence risk scoring.' },
      { q: /yield/i, a: 'Yield: Historical yield + soil chemistry + forecast alignment determine estimate bands.' }
    ];
    let reply = 'I will learn this soon. Ask about yield, weather, disease or fertilizer for now.';
    for (const f of FAQ) { if (f.q.test(message)) { reply = f.a; break; } }
    res.status(200).json({ reply, ts: Date.now() });
  } catch (e) {
    res.status(500).json({ error: 'server error' });
  }
}
